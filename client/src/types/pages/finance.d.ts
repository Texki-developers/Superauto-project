interface AssignVehiclesProps {
  setAssign: React.Dispatch<React.SetStateAction<boolean>>;
  itemId: number;
  parent: string;
  apiUrl: string;
}
interface IassignFormInput {
  vehicle: { regNum: string; amount: number }[];
}

export type { IassignFormInput, AssignVehiclesProps };
