import { useManyChildren } from '@/hooks/models/useChildren';
import { Gender } from '@/types/enums/gender';
import { Child } from '@/types/models/children';
import { ScrollView, View } from 'react-native';
import Loading from '../../Loading';
import ChildrenLine from './base/CampChildrenLine';

const dummyData: Child[] = [
  { id: '1', firstName: 'Johnathanisko', lastName: 'Doepiskovič', birthDate: new Date('2010-01-01'), gender: Gender.MALE, accessCode: "HXFLOP2", createdAt: new Date('2023-01-01') },
  { id: '2', firstName: 'Jane', lastName: 'Smith', birthDate: null, gender: Gender.FEMALE, accessCode: "", createdAt: new Date('2023-01-01') },
  { id: '3', firstName: 'Alice', lastName: 'Johnson', birthDate: new Date('2015-03-03'), gender: Gender.FEMALE, accessCode: "", createdAt: new Date('2023-01-01') },
  { id: '4', firstName: 'Michael', lastName: 'Brown', birthDate: new Date('2011-04-15'), gender: Gender.MALE, accessCode: "", createdAt: new Date('2023-02-10') },
  { id: '5', firstName: 'Emily', lastName: 'Davis', birthDate: new Date('2013-05-20'), gender: Gender.FEMALE, accessCode: "", createdAt: new Date('2023-02-10') },
  { id: '6', firstName: 'David', lastName: 'Wilson', birthDate: new Date('2014-06-12'), gender: Gender.MALE, accessCode: "", createdAt: new Date('2023-03-15') },
  { id: '7', firstName: 'Sarah', lastName: 'Taylor', birthDate: new Date('2010-07-25'), gender: Gender.FEMALE, accessCode: "", createdAt: new Date('2023-03-15') },
  { id: '8', firstName: 'James', lastName: 'Anderson', birthDate: new Date('2012-08-30'), gender: Gender.MALE, accessCode: "", createdAt: new Date('2023-04-01') },
  { id: '9', firstName: 'Laura', lastName: 'Martinez', birthDate: new Date('2015-09-10'), gender: Gender.FEMALE, accessCode: "", createdAt: new Date('2023-04-01') },
  { id: '10', firstName: 'Thomas', lastName: 'Garcia', birthDate: new Date('2011-10-05'), gender: Gender.MALE, accessCode: "", createdAt: new Date('2023-05-20') },
  { id: '11', firstName: 'Olivia', lastName: 'Lee', birthDate: new Date('2013-11-18'), gender: Gender.FEMALE, accessCode: "", createdAt: new Date('2023-05-20') },
  { id: '12', firstName: 'Ethan', lastName: 'Clark', birthDate: new Date('2014-12-22'), gender: Gender.MALE, accessCode: "", createdAt: new Date('2023-06-10') },
  { id: '13', firstName: 'Sophia', lastName: 'Lewis', birthDate: new Date('2010-02-14'), gender: Gender.FEMALE, accessCode: "", createdAt: new Date('2023-06-10') },
  { id: '14', firstName: 'Daniel', lastName: 'Walker', birthDate: new Date('2012-03-28'), gender: Gender.MALE, accessCode: "", createdAt: new Date('2023-07-05') },
  { id: '15', firstName: 'Mia', lastName: 'Hall', birthDate: new Date('2015-04-09'), gender: Gender.FEMALE, accessCode: "", createdAt: new Date('2023-07-05') },
];

const ChildrenContent = () => {
  const { children, isLoading, isError } = useManyChildren();

  if (!children || isLoading || isError) {
    return <Loading showText={false} />;
  }

  return (
    <View className="h-[87.5%] border-t border-outline-500">
      <ScrollView contentContainerClassName="items-center gap-5 py-5">
        {children.map((child, index) => (
          <ChildrenLine
            key={index}
            child={child}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default ChildrenContent