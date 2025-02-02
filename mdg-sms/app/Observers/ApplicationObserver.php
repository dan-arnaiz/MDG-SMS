<?php

namespace App\Observers;

use App\Models\Application;

class ApplicationObserver
{
    /**
     * Handle the Application "created" event.
     */
    public function created(Application $application): void
    {
        $this->updateScholarshipSlots($application);
    }

    /**
     * Handle the Application "updated" event.
     */
    public function updated(Application $application): void
    {
        if ($application->isDirty('status') && in_array($application->status, ['inactive', 'terminated'])) {
            $this->handleInactiveOrTerminated($application);
        } else {
            $this->updateScholarshipSlots($application);
        }
    }

    private function updateScholarshipSlots(Application $application)
    {
        $scholarship = $application->scholarship;
        if ($scholarship) {
            $scholarship->taken_slots = $scholarship->applications()->count();
            $scholarship->is_full = $scholarship->taken_slots >= $scholarship->max_slots;
            $scholarship->save();
        }
    }

    private function handleInactiveOrTerminated(Application $application)
    {
        if ($application->scholarship) {
            $scholarship = $application->scholarship;
            $application->scholarship_id = null; // Remove scholarship ID
            $application->saveQuietly(); // Prevent infinite loop in observer

            // Recalculate taken slots
            $scholarship->taken_slots = $scholarship->applications()->whereNotIn('status', ['inactive', 'terminated'])->count();
            $scholarship->is_full = $scholarship->taken_slots >= $scholarship->max_slots;
            $scholarship->save();
        }
    }

    /**
     * Handle the Application "deleted" event.
     */
    public function deleted(Application $application): void
    {
        $this->updateScholarshipSlots($application);
    }

    /**
     * Handle the Application "restored" event.
     */
    public function restored(Application $application): void
    {
        //
    }

    /**
     * Handle the Application "force deleted" event.
     */
    public function forceDeleted(Application $application): void
    {
        //
    }
}
