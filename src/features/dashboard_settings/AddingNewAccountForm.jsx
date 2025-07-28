import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { useCurrentUser } from './useCurrentUser';
import UserType from './UserType';
import { useState } from 'react';
import { useAddAccount } from './useAddAcount';
export default function AddingNewAccountForm({ isAdmin }) {
    const { register, handleSubmit, formState, reset, watch } = useForm();
    const { errors } = formState;
    const { isLoading, user } = useCurrentUser();
    const { isAdding, addnewUser } = useAddAccount();
    const [accountType, setAccountType] = useState({ value: 'Viewer', label: 'Viewer' });
    const userTypeArray = [
        { value: 'Admin', label: 'Admin' },
        { value: 'Viewer', label: 'Viewer' },
    ]
    async function onFormSubmit(data) {
        if (!data.email && !data.first_name && !data.last_name && !data.password && !data.password_match) {
            return;
        }
        const editedUser = {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            password: data.password,
            accountType: accountType.value
        }
        addnewUser(editedUser);
    }
    if (isLoading) return <SpinnerMini />;
    return <div className="">
        <Form className="!p-1" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="flex flex-col w-full items-end">


                <div className=" flex items-center mt-6 w-full flex-1 space-x-5 lg:space-x-10">
                    <div className=" mt-6 flex-1">
                        <FormRowVertical label="ناوی دووەم" error={errors?.last_name?.message}>
                            <div className="input rtl flex flex-row justify-between">
                                <input
                                    className="w-full"
                                    type="text"
                                    id="last_name"
                                    autoComplete="last_name"
                                    {...register('last_name', { required: 'ناوی دووەم پێویستە' })}
                                />


                            </div>
                        </FormRowVertical>
                    </div>
                    <div className=" mt-6 flex-1">
                        <FormRowVertical label="ناوی یاکەم" error={errors?.first_name?.message}>
                            <div className="input rtl flex flex-row justify-between">
                                <input
                                    className="w-full"
                                    type="text"
                                    id="first_name"
                                    autoComplete="first_name"
                                    {...register('first_name', { required: 'ناوی یاکەم پێویستە' })}
                                />


                            </div>
                        </FormRowVertical>
                    </div>

                </div>
                <div className=" flex items-center mt-6 w-full flex-1 space-x-5 lg:space-x-10">
                    <div className="flex-1 ">
                        <UserType userTypeArray={userTypeArray} accountType={accountType} setAccountType={setAccountType} />
                    </div>
                    <div className="flex-1">
                        <FormRowVertical label="ئیمەیڵ" error={errors?.email?.message}>
                            <div className="input rtl flex flex-row justify-between">
                                <input
                                    className="w-full"
                                    type="text"
                                    id="email"
                                    autoComplete="email"
                                    {...register('email', { required: 'ئیمەیڵ پێویستە', })}
                                />
                            </div>
                        </FormRowVertical>
                    </div>

                </div>
                <div className=" flex items-center w-full flex-1 space-x-5 lg:space-x-10">

                    <div className=" mt-6 flex-1">
                        <FormRowVertical label="دوبارە کردنەوەی وشەی نهێنی" error={errors?.password_match?.message}>
                            <div className="input rtl flex flex-row justify-between">
                                <input
                                    className="w-full"
                                    type="password"
                                    id="password_match"
                                    autoComplete="password_match"
                                    {...register('password_match', { required: 'وشەی نهێنی پێویستە', validate: (value) => value === watch("password") || "وشەی نهێنی پێوستە هاوشێوەبێت" },)}

                                />


                            </div>
                        </FormRowVertical>
                    </div>
                    <div className=" mt-6 flex-1">
                        <FormRowVertical label="وشەی نهێنی" error={errors?.password?.message}>
                            <div className="input rtl flex flex-row justify-between">
                                <input
                                    className="w-full"
                                    type="password"
                                    id="password"
                                    autoComplete="password"
                                    {...register('password', { required: 'وشەی نهێنی داخڵ بکە', minLength: { value: 8, message: 'وشەی نهێنی پێویستە ٨ پیت یان زیاتربێت' } })}
                                />


                            </div>
                        </FormRowVertical>
                    </div>


                </div>
            </div>
            <div className="rtl mt-4 flex  gap-5">
                {isAdmin && <Button className="mt-6" type="submit" variation="confirm" size="large">
                    {!isAdding ? 'تۆمارکردن' : <SpinnerMini />}
                </Button>}

                <Button
                    type="button"
                    variation="confirm"
                    onClick={() => {
                        setAccountType({ value: 'Viewer', label: 'Viewer' });
                        reset()
                    }}
                    className="mt-6 bg-gray-200 text-gray-700"
                >
                    پەشیمانبونەوە
                </Button>
            </div>

        </Form>
    </div>
}