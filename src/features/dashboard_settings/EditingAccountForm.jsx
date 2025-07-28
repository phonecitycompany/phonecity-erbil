import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { MdLocationOn } from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
import { useCurrentUser } from './useCurrentUser';
import { useEditCurrentUser } from './useEditCurrentUser';
export default function EditAccountForm() {
    const { register, handleSubmit, formState, reset } = useForm();
    const { errors } = formState;
    const { isLoading, user } = useCurrentUser();
    const { isEditing, updateUser } = useEditCurrentUser()
    async function onFormSubmit(data) {
        if (!data.email && !data.first_name && !data.last_name) {
            return;
        }
        const editedUser = {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,

        }
        updateUser(editedUser);
        if (!isEditing) {

        }
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
                                    defaultValue={user?.user_metadata?.last_name}
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
                                    defaultValue={user?.user_metadata?.first_name}
                                    {...register('first_name', { required: 'ناوی یاکەم پێویستە' })}
                                />


                            </div>
                        </FormRowVertical>
                    </div>

                </div>
                <div className="w-1/2 mt-6 lg:pl-5 pl-3">
                    <FormRowVertical label="ئیمەیڵ" error={errors?.email?.message}>
                        <div className="input rtl flex flex-row justify-between">
                            <input
                                className="w-full"
                                type="text"
                                id="email"
                                autoComplete="email"
                                defaultValue={user?.email}
                                {...register('email', { required: 'ئیمەیڵ پێویستە', })}
                            />
                        </div>
                    </FormRowVertical>
                </div>

            </div>
            <div className="rtl mt-4 flex  gap-5">
                <Button className="mt-6" type="submit" variation="confirm" size="large">
                    {!isEditing ? 'تۆمارکردن' : <SpinnerMini />}
                </Button>
                <Button
                    type="button"
                    variation="confirm"
                    onClick={() => reset()}
                    className="mt-6 bg-gray-200 text-gray-700"
                >
                    پەشیمانبونەوە
                </Button>
            </div>

        </Form>
    </div>
}