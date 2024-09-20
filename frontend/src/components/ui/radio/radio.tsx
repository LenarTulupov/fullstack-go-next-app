interface IRadio {
  id: string;
}

export default function Radio({ id }: IRadio ) {
  return (
    <input type="radio" id={id} />
  )
};
