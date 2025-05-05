import { useFinanceBuffetContext } from '@/components/custom/context/FinanceBuffetContext';
import { useFinanceOverviewContext } from '@/components/custom/context/FinanceOverviewContext';
import EmptyScreenMessage from '@/components/custom/EmptyScreenMessage';
import Loading from '@/components/custom/Loading';
import { useManyAccountsWithLeader } from '@/hooks/models/useGroupAccounts';
import { FinanceBuffetData, FinanceBuffetParams } from '@/types/finance';
import { formatISOLocalToHumanReadable } from '@/utils/dates';
import { buffetSchema } from '@/validation/finance';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Buffet = () => {
  const navigation = useNavigation();
  const { leaderId } = useLocalSearchParams<FinanceBuffetParams>();
  const { children, isLoading, isError } = useManyAccountsWithLeader(leaderId);
  const { actionAmounts, setActionAmounts } = useFinanceBuffetContext();
  const { totalAmount } = useFinanceOverviewContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const { control, register, handleSubmit, watch, reset, formState: { errors } } = useForm<FinanceBuffetData>({
    defaultValues: { actionAmount: null },
    resolver: zodResolver(buffetSchema),
  });

  // setting the header title based on current date
  useEffect(() => {
    navigation.setOptions({
      title: `Bufet (${formatISOLocalToHumanReadable(new Date())})`
    })
  }, []);

  if (!children || isLoading || isError) {
    return <Loading showText={false} />;
  }

  if (children.length === 0) {
    return <EmptyScreenMessage text='V oddieli nie sú zatiaľ priradené žiadne deti.' />;
  }

};

export default Buffet;