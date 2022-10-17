import { GetServerSideProps, NextPage } from "next";
import BillSvc, { Billionaire } from "../../service/bill";

type PersonProp = {
  person: Billionaire;
};

const Person: NextPage<PersonProp> = ({ person }) => {
  if (!person) {
    return <div>No data</div>;
  }

  return (
    <div>
      <p>id: {person.id}</p>
      <p>state: {person.state}</p>
      <p>city: {person.city}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;
  let ret: Billionaire | undefined;

  await BillSvc.GetBillionaire(id)
    .then((person) => {
      ret = person;
    })
    .catch((e) => {
      console.log(e);
      ret = undefined;
    });

  if (ret) {
    return { props: { person: ret } };
  } else {
    return { props: {} };
  }
};

export default Person;
