import { z } from "zod";

export const createBookingSchema = z.object({
  serviceId: z.string().min(1),
  startISO: z.string().min(1),
  customerName: z.string().trim().min(1, "Name is required").max(200),
  customerEmail: z.string().trim().email("Enter a valid email address"),
  customerPhone: z.string().trim().max(50).optional().default(""),
  notes: z.string().trim().max(1000).optional().default(""),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
