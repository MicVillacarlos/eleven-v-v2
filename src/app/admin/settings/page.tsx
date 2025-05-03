export const dynamic = "force-dynamic";

import { fetchRoomsInitial } from "../../../lib/admin/api/room/room-server";
import Settings from "./settings";

export default async function SettingsPage() {
  const { data: initialRooms, count: initialTotal } = await fetchRoomsInitial(
    "",
    1,
    5
  );

  return <Settings initialRooms={initialRooms} initialTotal={initialTotal} />;
}
