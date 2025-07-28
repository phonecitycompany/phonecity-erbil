import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { FaPhoneFlip } from 'react-icons/fa6';
import { useAddPartner } from './useAddPartner';
function AddPartnerForm({ onCloseModal }) {
    const { register, handleSubmit, formState } = useForm();

    const { errors } = formState;
    const { isAdding, addPartnerFunction } = useAddPartner();
    async function onFormSubmit(data) {
        if (!data.Partner_name || !data.share) {
            return;
        }
        addPartnerFunction({
            Partner_name: data.Partner_name,
            share: data.share / 100 || null,
            deposit: 0,
            withdrawal: 0,
            total: 0,
        });
        if (!isAdding) {
            onCloseModal();
        }
    }

    return (
        <Form className="!p-1" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="flex flex-row gap-6">

                <div className="">
                    <div className="">
                        <FormRowVertical error={errors?.Partner_name?.message}>
                            <div className="input ltr flex flex-row justify-between">
                                <input
                                    className="w-96"
                                    type="text"
                                    id="Partner_name"
                                    autoComplete="Partner_name"
                                    {...register('Partner_name', {
                                        required: 'ناوی شەریک داغڵ بکە',
                                    })}
                                />
                                <label
                                    htmlFor="Partner_name"
                                    className="mt-2 cursor-pointer text-gray-500"
                                >
                                    ناوی شەریک
                                </label>
                            </div>
                        </FormRowVertical>
                    </div>
                    <div className=" mt-6">
                        <FormRowVertical error={errors?.share?.message}>
                            <div className="input ltr flex flex-row justify-between">
                                <input
                                    className="w-96 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    type="number"
                                    id="share"
                                    autoComplete="share"
                                    {...register('share', { required: 'بەشەکە داغڵ بکە' })}
                                />
                                <label
                                    htmlFor="share"
                                    className="mt-2 flex cursor-pointer flex-row-reverse items-center gap-3 text-gray-500"
                                >
                                    <span>بەش لە ١٠٠</span>
                                </label>
                            </div>
                        </FormRowVertical>
                    </div>

                </div>
            </div>
            <div className="rtl mt-4 flex  gap-5">
                <Button className="mt-6" type="submit" variation="confirm" size="large">
                    {!isAdding ? 'تۆمارکردن' : <SpinnerMini />}
                </Button>
                <Button
                    type="button"
                    variation="confirm"
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

export default AddPartnerForm;
