import { useUsersStore } from "../hooks/useUsersStore";

export default function DailyMessage() {
  const { name } = useUsersStore();
  return (
    <div className="ring-1 ring-black rounded">
      <p>
        {name}
      </p>
    </div>
  );
}
