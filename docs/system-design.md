##     TUGWELL HALL SYSTEM DESIGN

This document gives clarity to how the system works.

## 1.Project Overview

#### Project Name 
- Khulisa - TGH Laundry Management System

#### Description

                 residences
                      │
         ┌────────────┴────────────┐
         │                         │
      profiles                 machines
         │                         │
         │                         │
         │                    bookings
         │                    /      \
         │                   /        \
    user_roles         time_slots     fines
         │                   \         /
         │                    \       /
       roles                (optional booking link)

A web-based laundry management system designed for university residences.
The system allows students to book laundry machines, receptionists to manage laundry keys and fines, and subwardens to manage students and monitor laundry operations.

## Project Objectives

- Improve booking system
- digitalize laundry key management
- improve accountability through booking records


## Day 2 Review
## Goal

Design the complete database and understand how the system works before writing code.

Status: Completed

## USER ROLES


### Student

Responsibilities

- Book a washing machine.
- View active bookings.
- View booking history.
- View pickup and return codes.
- Change temporary password amd create a new permanent password.
- View fines.

### Receptionist

Responsibilities

- View today's bookings.
- Verify pickup codes.
- Issue laundry keys.
- Verify return codes.
- Record key returns.
- Issue fines.

### Subwarden

Responsibilities

- Add students.
- Assign roles.
- Reset passwords.
- Manage laundry machines.
- View reports.
- View fines.

### Student Management

- Only subwardens can add new students.
- Every new student receives a temporary password.
- Students must create a permanent password on first login.
- Students who leave the residence are marked as inactive by a subwarden.
- Inactive students cannot log in or make bookings.
- Student records are retained for historical reporting and auditing.

### Role Management

- Every receptionist and subwarden must be a registered student.
- Roles can be assigned or removed by a subwarden.
- A user may hold multiple roles simultaneously.
- During role handovers, two users may temporarily hold the same role.
- The system must always have at least one active Subwarden.
- The last active Subwarden cannot remove their own Subwarden role until another active Subwarden exists.



### Authentication

- Every user is added by a subwarden.
- Every user receives a temporary password.
- Users must change their password on first login.
- Users with multiple roles choose a workspace after login.
- Users with one role are automatically redirected to their dashboard.

### Booking

- Bookings open every day at 06:00.
- Booking closes before key collection begins.
- Students may only have one booking per day.
- One machine can only be booked once per time slot.
- Every booking generates:
  - Pickup Code
  - Return Code

  ### Laundry Schedule

| Slot | Time |
|------|------|
| 1 | 08:00 – 11:00 |
| 2 | 11:00 – 14:00 |
| 3 | 14:00 – 17:00 |
| 4 | 17:00 – 20:00 |
| 5 | 20:00 – 23:00 |

### Reception

- Reception verifies pickup codes before issuing keys.
- Reception verifies return codes before accepting returned keys.
- Returning a key completes the booking.

### Fines

- Fines may be issued for multiple reasons.
- A fine may or may not be linked to a booking.
- Students with three active fines cannot make new bookings.


## 5. Database Design

### Planned Tables

- residences
- profiles
- roles
- user_roles
- machines
- time_slots
- bookings
- fines

## 6. Database Relationships

- One residence has many users.
- One residence has many machines.
- One user may have many roles.
- One machine has many bookings.
- One booking belongs to one machine.
- One booking belongs to one student.
- One student may have many bookings.
- One student may have many fines.


## 8. Future Improvements

- QR codes instead of 3-digit codes.
- SMS or email reminders.
- Booking notifications.
- Laundry usage analytics.
- Multiple residence support.
- Admin dashboard.

DAY 3 - HOW WEBSITE COMMUNICATES WITH DATABASE

browser - Javascript - Supabase - Database

Student enters details

↓

JavaScript sends them to Supabase

↓

Supabase checks them

↓

Supabase replies

↓

JavaScript decides what to do next


# Authantication & Authorization

Authantication answers - Who are you?
Authorization answers - What are you allowed to do?

Student opens website
        │
        ▼
Login page
        │
        ▼
Enters UCT email + password
        │
        ▼
Supabase Authentication
        │
        ▼
Is email/password correct?
        │
   ┌────┴────┐
   │         │
  No        Yes
   │         │
Show error   ▼
         Get user's profile
               │
               ▼
         Get user's roles
               │
        ┌──────┴──────┐
        │             │
     One role     Multiple roles
        │             │
        ▼             ▼
 Open dashboard   Choose workspace

## Example

Student? - open student dashboard - receptionist? - open reception dashboard

Step 1 - Subwarden Adds a Student

The subwarden opens the Add Student form.

They enter:

Student Number: 221045678

First Name: Likho

Last Name: Mmango

UCT Email: mmnlik002@myuct.ac.za

Room Number: A12

Temporary Password: Laundry@2026

Then they click:

Create Student

Step 2 - What the System Does

Behind the scenes, two things happen.

Authentication

Supabase creates:

Email

mmnlik002@myuct.ac.za

Password

Laundry@2026

This account is now able to log in.

Database

The system creates the student's profile.

Student Number

221045678

Room

A12

Residence

Ubuntu Residence

First Login

TRUE

Active

TRUE

It also assigns the Student role automatically.


Step 3 - Student Logs In

The student visits your website.

They see:

TGH Laundry System

Email

[________________]

Password

[________________]

[ Login ]

They enter:

Email

mmnlik002@myuct.ac.za

Password

Laundry@2026

Step 4 - Supabase Checks the Login

If the password is wrong:

 Invalid email or password.

If correct:

 Login successful.
