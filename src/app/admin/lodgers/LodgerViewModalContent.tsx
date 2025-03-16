import React from "react";

import { FetchLodgerType } from "../../../lib/admin/api/lodgers/types";
import ViewTextLabel from "../../components/Atoms/text/ViewTextLabel";
import { capitalizeFirstLetter } from "../../helpers/helpers";

interface LodgerViewModalContentProps {
  lodger: FetchLodgerType | null;
}

export const LodgerViewModalContent: React.FC<LodgerViewModalContentProps> = ({
  lodger,
}) => {

  return (
    <div>
      <div className="flex w-full">
        <div className="w-1/2">
          <ViewTextLabel>Contact Number:</ViewTextLabel>
          {lodger?.phone_number}
        </div>
        <div className="w-1/2">
          <ViewTextLabel>Email:</ViewTextLabel>
          {lodger?.email}
        </div>
      </div>
      <div className="flex w-full mt-5">
        <div className="w-1/2">
          <ViewTextLabel>Home Address:</ViewTextLabel>
          {lodger?.home_address}
        </div>

        <div className="w-1/2">
          <ViewTextLabel>Sex:</ViewTextLabel>
          {capitalizeFirstLetter(lodger?.sex ?? "")}
        </div>
      </div>
      <div className="mt-5 flex w-full">
        <div className="w-1/2">
          <ViewTextLabel>Emergency Contact Person:</ViewTextLabel>
          {lodger?.emergency_contact_person}
        </div>
        <div className="w-1/2">
          <ViewTextLabel>Emergency Contact Person:</ViewTextLabel>
          {lodger?.emergency_contact_number}
        </div>
      </div>
      <div className="mt-5 flex w-full">
        <div className="w-1/2">
          <ViewTextLabel>Occupation:</ViewTextLabel>
          {lodger?.occupation}
        </div>
        <div className="w-1/2">
          <ViewTextLabel>Company/School:</ViewTextLabel>
          {lodger?.company_or_school}
        </div>
      </div>
    </div>
  );
};
