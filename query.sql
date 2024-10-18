CREATE TABLE IF NOT EXISTS public.users (
  "id" BIGSERIAL PRIMARY KEY,
  "name" VARCHAR(100),
  "email" VARCHAR(100),
  "password" VARCHAR(100),
  "role" VARCHAR(100), -- user, approver, driver
  "token" VARCHAR(100),
  "last_location" GEOGRAPHY(POINT, 4326),
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE,
  "deleted_at" TIMESTAMP WITH TIME ZONE
)

CREATE TABLE IF NOT EXISTS public.bookings (
  "id" BIGSERIAL PRIMARY KEY,
  "user_id" BIGINT,
  "destination" GEOGRAPHY(POINT, 4326),
  "status" VARCHAR(100), -- created, accepted, on going, completed , rejected
  "driver_id" BIGINT, -- with role driver
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE,
  "deleted_at" TIMESTAMP WITH TIME ZONE
)

CREATE TABLE IF NOT EXISTS public.drivers (
  "id" BIGSERIAL PRIMARY KEY,
  "user_id" BIGINT,
  "car_name" VARCHAR(100),
  "car_plate" VARCHAR(100),
  "status" VARCHAR(100), -- off, idle, busy
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE,
  "deleted_at" TIMESTAMP WITH TIME ZONE
)