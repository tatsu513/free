"use client";

type Props = {
  city: string;
  setCity: (data: string) => void;
  onSubmit: () => void;
};

export default function SearchCity(props: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        className="p-2 border rounded"
        placeholder="都市名を入力"
        value={props.city}
        onChange={(e) => props.setCity(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={props.onSubmit}
      >
        検索
      </button>
    </div>
  );
}
