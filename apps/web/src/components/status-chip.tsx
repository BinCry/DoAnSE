type StatusChipProps = {
  tone:
    | "neutral"
    | "success"
    | "warning"
    | "danger"
    | "info";
  label: string;
};

export function StatusChip({ tone, label }: StatusChipProps) {
  return <span className={`status-chip status-chip-${tone}`}>{label}</span>;
}
