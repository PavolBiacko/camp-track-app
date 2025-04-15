import FinanceAccountLine from '@/components/custom/finance/accounts/FinanceAccountLine';
import { ScrollView } from 'react-native';

const dummyData = [
  {
    id: "uuid-1",
    firstName: "John",
    lastName: "Doe",
    birthDate: "1990-01-01",
    gender: "male",
    groupId: 12,
    accountBalance: 0
  },
  {
    id: "uuid-2",
    firstName: "Jane",
    lastName: "Doe",
    birthDate: "1992-02-02",
    gender: "male",
    groupId: 12,
    accountBalance: 0
  },
  {
    id: "uuid-3",
    firstName: "John",
    lastName: "Smith",
    birthDate: "1993-03-03",
    gender: "male",
    groupId: 12,
    accountBalance: -100
  },
  {
    id: "uuid-3",
    firstName: "John",
    lastName: "Smith",
    birthDate: "1993-03-03",
    gender: "male",
    groupId: 12,
    accountBalance: 0
  },
  {
    id: "uuid-3",
    firstName: "John",
    lastName: "Smith",
    birthDate: "1993-03-03",
    gender: "male",
    groupId: 12,
    accountBalance: 0
  },
  {
    id: "uuid-3",
    firstName: "John",
    lastName: "Smith",
    birthDate: "1993-03-03",
    gender: "male",
    groupId: 12,
    accountBalance: 0
  },
  {
    id: "uuid-3",
    firstName: "John",
    lastName: "Smith",
    birthDate: "1993-03-03",
    gender: "male",
    groupId: 12,
    accountBalance: 0
  },
  {
    id: "uuid-3",
    firstName: "John",
    lastName: "Smith",
    birthDate: "1993-03-03",
    gender: "male",
    groupId: 12,
    accountBalance: 0
  },
  {
    id: "uuid-3",
    firstName: "John",
    lastName: "Smith",
    birthDate: "1993-03-03",
    gender: "male",
    groupId: 12,
    accountBalance: 0
  },
  {
    id: "uuid-3",
    firstName: "Anna Mária",
    lastName: "Antoaneta",
    birthDate: "1993-03-03",
    gender: "male",
    groupId: 12,
    accountBalance: 0
  },
  {
    id: "uuid-3",
    firstName: "John",
    lastName: "Smith",
    birthDate: "1993-03-03",
    gender: "male",
    groupId: 12,
    accountBalance: 0
  },
  {
    id: "uuid-3",
    firstName: "John",
    lastName: "Smith",
    birthDate: "1993-03-03",
    gender: "male",
    groupId: 12,
    accountBalance: 0
  },
  {
    id: "uuid-3",
    firstName: "John",
    lastName: "Smith",
    birthDate: "1993-03-03",
    gender: "male",
    groupId: 12,
    accountBalance: -50
  },
];

const Accounts = () => {
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 10 }}>
      {dummyData.map((account) => (
        <FinanceAccountLine child={account} />
      ))}
    </ScrollView>
  )
}

export default Accounts