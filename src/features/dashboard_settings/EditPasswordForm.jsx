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
export default function EditPasswordform() {
    const { register, handleSubmit, formState, watch, reset } = useForm();
    const { errors } = formState;
    const { isLoading, user } = useCurrentUser();
    const { isEditing, updateUser } = useEditCurrentUser()

    async function onFormSubmit(data) {
        if (!data.password && !data.password_match) {
            return;
        }
        const editedUser = {
            password: data.password,
        }
        updateUser(editedUser);
        if (!isEditing) {

        }
    }
    if (isLoading) return <SpinnerMini />;

    return <div className="">
        <Form className="!p-1" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="flex flex-col w-full items-end">
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
            <div className="rtl mt-4 flex  gap-5 mb-10">
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