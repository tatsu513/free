type Props = {
  label: string;
  disabled?: boolean;
  onSubmit: () => void;
  additionalClassName?: string;
};
export const BasicButton = (props: Props) => {
  return (
    <button
      type="button"
      className={`border px-4 py-2 rounded cursor-pointer bg-grey-100 hover:bg-grey-300 transition ${props.additionalClassName}`}
      disabled={props.disabled}
      onClick={props.onSubmit}
    >
      {props.label}
    </button>
  );
};
