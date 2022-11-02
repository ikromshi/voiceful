export type VoiceSelectorProps = {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

export type BackendDataType = {
  posts: {
    title: string;
    body: string;
    id: number;
  }[]
};