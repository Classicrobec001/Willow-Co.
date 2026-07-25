import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "@/lib/adminAuth";
import { listUpcomingBookings, getServiceById } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import brand from "@/config/brand";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidSessionToken(token)) {
    redirect("/admin/login");
  }

  const bookings = listUpcomingBookings();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Upcoming bookings</h1>
          <p className="text-sm text-muted-foreground">{brand.name}</p>
        </div>
        <AdminLogoutButton />
      </div>

      {bookings.length === 0 ? (
        <p className="text-muted-foreground">No upcoming bookings yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left">
                <th className="px-4 py-3 font-medium text-foreground">When</th>
                <th className="px-4 py-3 font-medium text-foreground">Service</th>
                <th className="px-4 py-3 font-medium text-foreground">Customer</th>
                <th className="px-4 py-3 font-medium text-foreground">Contact</th>
                <th className="px-4 py-3 font-medium text-foreground">Price</th>
                <th className="px-4 py-3 font-medium text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const service = getServiceById(b.service_id);
                const when = new Intl.DateTimeFormat("en-US", {
                  timeZone: brand.timezone,
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                }).format(new Date(b.start_time));
                return (
                  <tr key={b.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap">{when}</td>
                    <td className="px-4 py-3">{service?.name ?? b.service_id}</td>
                    <td className="px-4 py-3">{b.customer_name}</td>
                    <td className="px-4 py-3">
                      <div>{b.customer_email}</div>
                      {b.customer_phone && (
                        <div className="text-muted-foreground">{b.customer_phone}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {service ? formatPrice(service.price_cents) : "—"}
                    </td>
                    <td className="px-4 py-3 capitalize">{b.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
