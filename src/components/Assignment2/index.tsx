import { useEffect, useState } from "react";

interface AddressProps {
  address: string;
  city: string;
  postalCode: string;
}

interface CompanyProps {
  address: AddressProps[];
  department: string;
  name: string;
  title: string;
}

interface HairProps {
  color: string;
  type: string;
}

interface UserProps {
  address: AddressProps;
  company: CompanyProps;
  hair: HairProps;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
}

interface JsonProps {
  users: UserProps[];
  limit: number;
  skip: number;
  total: number;
}

export default function Assignment2() {
  const [jsonData, setJsonData] = useState<JsonProps | undefined>(undefined);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const department = () => {
    const group = jsonData?.users?.reduce(
      (arrGroup: { [department: string]: UserProps[] }, { company, ...e }) => {
        const department = company.department;
        if (!arrGroup[department]) arrGroup[department] = [];
        arrGroup[department].push(e as UserProps);
        return arrGroup;
      },
      {}
    );
    return group;
  };

  const groupDataByKey = (array: []) =>
    array.reduce((arr: { [key: string]: string[] }, curr) => {
      Object.entries(curr).forEach(([k, v]) => {
        if (!arr[k]) {
          arr[k] = [];
        }
        arr[k].push(v as string);
      });
      return arr;
    }, {});

  const groupDataByKeyAddValue = (array: []) =>
    Object.entries(groupDataByKey(array)).reduce((arr: T, [k, v]) => {
      const collected = v.reduce(
        (inner_arr: { [key: string]: number }, inner_val) => {
          if (inner_val === null) {
            inner_val = "empty";
          }
          if (!inner_arr[inner_val]) {
            inner_arr[inner_val] = 0;
          }
          inner_arr[inner_val] += 1;
          return inner_arr;
        },
        {}
      );

      arr.push({
        [k]: collected,
      });

      return arr;
    }, []);

  const result = Object.entries(department() || []).reduce((arr: T, [k, v]) => {
    let female: number = 0;
    let male: number = 0;
    const mapData = v.reduce(
      (inner_arr: { [key: string]: number | string }, inner_val) => {
        if (inner_val === null) {
          inner_arr["hair"] = 0;
        }

        if (!inner_arr[inner_val.gender]) {
          inner_arr[inner_val.gender] = 0;
        }

        if (inner_val.gender === "male") {
          male++;
          inner_arr[inner_val.gender] = male;
        }
        if (inner_val.gender === "female") {
          female++;
          inner_arr[inner_val.gender] = female;
        }

        const mapHairProps = Object.values(v).map((k) => k.hair);

        const mapAgesProps = Object.values(v).map((k) => k.age);

        const mapAddrUserProps = Object.values(v).map((item) => {
          const fullName = `${item.firstName}${item.lastName}`;
          const postalCode = item.address.postalCode;
          return { fullName, postalCode };
        });

        inner_arr["ageRange"] =
          mapAgesProps.length > 1
            ? `${Math.min(...mapAgesProps)}-${Math.max(...mapAgesProps)}`
            : `${mapAgesProps}`;

        inner_arr["hair"] = groupDataByKeyAddValue(mapHairProps as [])[0].color;

        inner_arr["addressUser"] = mapAddrUserProps.reduce(
          (obj, item) =>
            Object.assign(obj, { [item.fullName]: item.postalCode }),
          {}
        ) as string;

        return inner_arr;
      },
      {}
    );

    arr.push({
      [k]: mapData,
    });

    return arr;
  }, []);

  return (
    <div className="py-12 px-0 xl:px-48">
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
