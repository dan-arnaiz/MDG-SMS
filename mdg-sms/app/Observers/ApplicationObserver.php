<?php

namespace App\Observers;

use App\Models\Application;
use App\Models\Subtype;

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
        $scholarship = $application->subtype?->scholarship; // Get scholarship through subtype
        if ($scholarship) {
            // Get all subtype IDs under this scholarship
            $subtypeIds = $scholarship->subtypes()->pluck('id');

            // Count all applications linked to these subtypes
            $scholarship->taken_slots = \App\Models\Application::whereIn('subtype_id', $subtypeIds)->count();

            // Check if full
            $scholarship->is_full = $scholarship->taken_slots >= $scholarship->max_slots;

            $scholarship->save();
        }
    }

    private function handleInactiveOrTerminated(Application $application)
    {
        $scholarship = $application->subtype?->scholarship; // Access scholarship via subtype
        if ($scholarship) {
            $application->saveQuietly();

            // Get all subtypes under this scholarship
            $subtypeIds = $scholarship->subtypes()->pluck('id'); 

            // Count applications related to these subtypes, excluding inactive/terminated ones
            $scholarship->taken_slots = \App\Models\Application::whereIn('subtype_id', $subtypeIds)
                ->whereNotIn('status', ['inactive', 'terminated'])
                ->count();

            // Check if full
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
