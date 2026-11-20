<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactMessageTest extends TestCase
{
    public function test_can_submit_contact_message_as_guest(): void
    {
        $response = $this->postJson('/api/contact', [
            'name' => 'Jean-Luc Picard',
            'email' => 'picard@starfleet.test',
            'phone' => '+33 6 12 34 56 78',
            'subject' => 'VIP Chauffeur Service',
            'message' => 'Need executive transfer for state visit.',
            'user_id' => null,
        ]);

        $response->assertStatus(201)
                 ->assertJson([
                     'status' => 'success',
                     'data' => [
                         'name' => 'Jean-Luc Picard',
                         'email' => 'picard@starfleet.test',
                         'subject' => 'VIP Chauffeur Service',
                         'status' => 'unread',
                     ]
                 ]);

        $this->assertDatabaseHas('contact_messages', [
            'email' => 'picard@starfleet.test',
            'subject' => 'VIP Chauffeur Service',
            'status' => 'unread',
        ]);
    }

    public function test_can_list_contact_messages_with_counts(): void
    {
        $response = $this->getJson('/api/contact-messages');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'status',
                     'data',
                     'counts' => ['all', 'unread', 'read', 'replied', 'archived']
                 ]);
    }

    public function test_can_update_status_and_reply_to_message(): void
    {
        $msg = ContactMessage::create([
            'name' => 'Arthur Dent',
            'email' => 'arthur@galaxy.test',
            'subject' => 'General Inquiry',
            'message' => 'Where is my towel and rental car?',
            'status' => 'unread',
        ]);

        // Auto mark as read
        $readRes = $this->putJson("/api/contact-messages/{$msg->id}/status", [
            'status' => 'read',
        ]);
        $readRes->assertStatus(200)
                ->assertJsonPath('data.status', 'read');

        // Reply to message
        $replyRes = $this->putJson("/api/contact-messages/{$msg->id}/status", [
            'admin_reply' => 'Your vehicle has been reserved with complimentary luxury towel.',
        ]);
        $replyRes->assertStatus(200)
                 ->assertJsonPath('data.status', 'replied')
                 ->assertJsonPath('data.admin_reply', 'Your vehicle has been reserved with complimentary luxury towel.');

        $this->assertDatabaseHas('contact_messages', [
            'id' => $msg->id,
            'status' => 'replied',
        ]);

        // Clean up test record
        $delRes = $this->deleteJson("/api/contact-messages/{$msg->id}");
        $delRes->assertStatus(200);

        $this->assertDatabaseMissing('contact_messages', [
            'id' => $msg->id,
        ]);
    }
}
