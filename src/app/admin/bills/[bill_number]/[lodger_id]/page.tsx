import Lodger from "./lodger";

export default async function LodgerId() {
  // const { data: initialLodger, count: initialTotal } = await fetchRoomsInitial(
  //   "",
  //   1,
  //   5
  // );

  return <Lodger />;
}


// import Lodger from "./lodger";
// import { fetchRoomsInitial } from "@/lib/api"; // Adjust path if needed

// export default async function LodgerId({ params }: { params: { bill_id: string } }) {
//   const { bill_id } = params;

//   const { data: initialRooms, count: initialTotal } = await fetchRoomsInitial(
//     bill_id, // Use bill_id from params
//     1,
//     5
//   );

//   return <Lodger />;
// }
