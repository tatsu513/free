"use client";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { InputText } from "@/components/form/InputText";

type Props = {
  city: string;
  setCity: (data: string) => void;
  onSubmit: () => void;
};

export default function SearchCity(props: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <InputText
        placeholder="都市名を入力"
        value={props.city}
        onChange={(e) => props.setCity(e)}
      />
      <PrimaryButton label="検索" onClick={props.onSubmit} />
    </div>
  );
}
