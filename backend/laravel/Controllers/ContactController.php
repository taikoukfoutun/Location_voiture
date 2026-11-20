<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Store a new contact / concierge message (Public).
     */
    public function store(Request $request)
    {
        $userId = $request->input('user_id');
        if (empty($userId) || $userId === 'null' || !is_numeric($userId)) {
            $userId = null;
        }

        $validator = Validator::make(array_merge($request->all(), ['user_id' => $userId]), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
            'user_id' => 'nullable|integer|exists:users,id',
        ], [
            'name.required' => 'Please provide your full legal name.',
            'email.required' => 'A valid contact email is required.',
            'email.email' => 'Please provide a valid email format.',
            'message.required' => 'Please describe your inquiry or concierge request.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => $validator->errors()->first()
            ], 422);
        }

        $inquiry = ContactMessage::create([
            'user_id' => $userId,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->subject ?: 'Concierge Rental Inquiry',
            'message' => $request->message,
            'status' => 'unread',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Concierge request transmitted successfully. A fleet manager will contact you shortly.',
            'data' => $inquiry
        ], 201);
    }

    /**
     * List all contact inquiries with filters and telemetry counts (Staff).
     */
    public function index(Request $request)
    {
        $query = ContactMessage::with(['user', 'responder'])->latest();

        // Status Filter
        if ($request->filled('status') && in_array($request->status, ['unread', 'read', 'replied', 'archived'])) {
            $query->where('status', $request->status);
        }

        // Search Filter
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        $messages = $query->get();

        // Calculate counts
        $counts = [
            'all' => ContactMessage::count(),
            'unread' => ContactMessage::where('status', 'unread')->count(),
            'read' => ContactMessage::where('status', 'read')->count(),
            'replied' => ContactMessage::where('status', 'replied')->count(),
            'archived' => ContactMessage::where('status', 'archived')->count(),
        ];

        return response()->json([
            'status' => 'success',
            'data' => $messages,
            'counts' => $counts
        ]);
    }

    /**
     * Update inquiry status and record concierge reply/notes.
     */
    public function updateStatus(Request $request, $id)
    {
        $inquiry = ContactMessage::find($id);
        if (!$inquiry) {
            return response()->json([
                'status' => 'error',
                'message' => 'Inquiry not found.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'nullable|in:unread,read,replied,archived',
            'admin_reply' => 'nullable|string',
            'user_id' => 'nullable|integer|exists:users,id',
            'replied_by' => 'nullable|integer|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
                'message' => $validator->errors()->first()
            ], 422);
        }

        if ($request->filled('status')) {
            $inquiry->status = $request->status;
        }

        if ($request->filled('admin_reply')) {
            $inquiry->admin_reply = $request->admin_reply;
            $inquiry->replied_at = now();
            $responderId = $request->replied_by ?: $request->user_id;
            if ($responderId) {
                $inquiry->replied_by = $responderId;
            }
            if ($inquiry->status === 'unread' || $inquiry->status === 'read' || empty($request->status)) {
                $inquiry->status = 'replied';
            }
        }

        $inquiry->save();
        $inquiry->load(['user', 'responder']);

        return response()->json([
            'status' => 'success',
            'message' => 'Inquiry record updated successfully.',
            'data' => $inquiry
        ]);
    }

    /**
     * Delete an inquiry (Admin only).
     */
    public function destroy($id)
    {
        $inquiry = ContactMessage::find($id);
        if (!$inquiry) {
            return response()->json([
                'status' => 'error',
                'message' => 'Inquiry not found.'
            ], 404);
        }

        $inquiry->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Inquiry removed successfully.'
        ]);
    }
}
