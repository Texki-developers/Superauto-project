

interface AssignVehiclesProps {
    setAssign: React.Dispatch<React.SetStateAction<boolean>>;
  }
  interface IassignFormInput {
    vehicle: { regNum: string; amount: number; }[];
  }

export type {
    IassignFormInput,
    AssignVehiclesProps
}