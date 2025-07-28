import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { MdLocationOn } from 'react-icons/md';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { TbWorld } from 'react-icons/tb';
// import InventoryEditInhput from '../../ui/InventoryEditInhput';
import { useAddLoans } from './useAddLoans';
import { useEditLoanItem } from './useEditLoanItem';
function EditLoanForm({ onCloseModal, loansItem, loanId }) {
    const { register, handleSubmit, formState } = useForm();
    const { isAdding, addLoan } = useAddLoans();
    const { errors } = formState;
    const defaultValues = loansItem?.find(debter => debter.id == loanId);
    const { isEditing, editLoan } = useEditLoanItem()
    async function onFormSubmit(data) {
        if (!data.debtor_name && !data.debtor_location && !data.debtor_phone_number && !data.debtor_email && !data.debtor_website) {
            return;
        }

        const newLoan = {
            debtor_name: data.debtor_name,
            debtor_email: data.debtor_email || null,
            debtor_location: data.debtor_location || null,
            debtor_phone_number: data.debtor_phone_number || null,
            debtor_website: data.debtor_website || null,
        }
        editLoan({ newLoan, loanId });
        if (!isEditing) {
            onCloseModal();
        }
    }
    if (!defaultValues) {
        return <div className="">no person selected to be edited</div>
    }

    return (
        <Form className="!p-1" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="flex flex-row gap-6">
                <div className="">
                    <FormRowVertical
                        className="!h-full"
                        error={errors?.debtor_location?.message}
                    >
                        <div className="input rtl flex h-full flex-col justify-between">
                            <label
                                htmlFor="debtor_location"
                                className="mt-2 flex cursor-pointer flex-row items-center gap-3  text-gray-500"
                            >
                                <MdLocationOn className="text-4xl text-main" />
                                <span>ناونیشانی وەرگر</span>
                            </label>
                            <textarea
                                className="mt-4 h-full w-96 resize-none"
                                type="text"
                                id="debtor_location"
                                defaultValue={defaultValues?.debtor_location}
                                autoComplete="debtor_location"
                                {...register('debtor_location')}
                            />
                        </div>
                    </FormRowVertical>
                </div>
                <div className="">
                    <div className="">
                        <FormRowVertical error={errors?.debtor_name?.message}>
                            <div className="input ltr flex flex-row justify-between">
                                <input
                                    className="w-96"
                                    type="text"
                                    id="debtor_name"
                                    autoComplete="debtor_name"
                                    defaultValue={defaultValues?.debtor_name}
                                    {...register('debtor_name', {
                                        required: 'ناوی وەرگر داغڵ بکە',
                                    })}
                                />
                                <label
                                    htmlFor="debtor_name"
                                    className="mt-2 cursor-pointer text-gray-500"
                                >
                                    ناوی وەرگر
                                </label>
                            </div>
                        </FormRowVertical>
                    </div>
                    <div className=" mt-6">
                        <FormRowVertical error={errors?.debtor_phone_number?.message}>
                            <div className="input ltr flex flex-row justify-between">
                                <input
                                    className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    type="number"
                                    id="debtor_phone_number"
                                    autoComplete="debtor_phone_number"
                                    defaultValue={defaultValues?.debtor_phone_number}
                                    {...register('debtor_phone_number')}
                                />
                                <label
                                    htmlFor="debtor_phone_number"
                                    className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                                >
                                    <FaPhoneFlip className="text-3xl text-main" />
                                    <span>ژمارەی وەرگر</span>
                                </label>
                            </div>
                        </FormRowVertical>
                    </div>
                    <div className=" mt-6 ">
                        <FormRowVertical error={errors?.debtor_email?.message}>
                            <div className="input ltr flex flex-row justify-between">
                                <input
                                    className="w-96"
                                    type="email"
                                    id="debtor_email"
                                    autoComplete="debtor_email"
                                    defaultValue={defaultValues?.debtor_email}
                                    {...register('debtor_email',)}
                                />
                                <label
                                    htmlFor="debtor_email"
                                    className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                                >
                                    <MdEmail className="text-3xl text-main" />
                                    <span>ئیمێڵی وەرگر</span>
                                </label>
                            </div>
                        </FormRowVertical>
                        <div className=" mt-6 ">
                            <FormRowVertical error={errors?.debtor_website?.message}>
                                <div className="input ltr flex flex-row justify-between">
                                    <input
                                        className="w-96"
                                        type="text"
                                        id="debtor_website"
                                        autoComplete="debtor_website"
                                        defaultValue={defaultValues?.debtor_website}
                                        {...register('debtor_website')}
                                    />

                                    <label
                                        htmlFor="debtor_website"
                                        className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                                    >
                                        <TbWorld className="text-3xl text-main" />
                                        <span>سایتی وەرگر</span>
                                    </label>
                                </div>
                            </FormRowVertical>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rtl mt-4 flex  gap-5">
                <Button className="mt-6" type="submit" variation="confirm" size="large">
                    {!false ? 'تۆمارکردن' : <SpinnerMini />}
                </Button>
                <Button
                    type="button"
                    variation="confirm"
                    disabled={false}
                    onClick={onCloseModal}
                    className="mt-6 bg-gray-200 text-gray-700"
                >
                    پەشیمانبونەوە
                </Button>
            </div>

            <FormRowVertical error={errors?.password?.message}></FormRowVertical>
        </Form>
    );
}

export default EditLoanForm;
