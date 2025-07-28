import Heading from '../../ui/Heading';
import SpinnerMini from '../../ui/SpinnerMini';
import useSettings from './useSettings';
import { BiSolidEditAlt } from "react-icons/bi";
import Modal from '../../ui/Modal';
import ButtonIcon from '../../ui/ButtonIcon';
import EditMoney from './EditMoney';
import { useUserforButtons } from '../authentication/useUserForButtons';
function ExchangeRate() {
  const { error, isLoading, settings: { USDTOAED } = {} } = useSettings();
  const { isAdmin } = useUserforButtons()
  if (error) return <Heading as="h2">هەڵە لەکاتی هێنانەوەی زانیاری</Heading>;

  return (
    <Heading as="h2" className="ltr flex-shrink-0">
      <div className="flex items-center">
        <div className="">
          100 USD = {isLoading ? <SpinnerMini /> : `${100 * USDTOAED} AED`}
        </div>
        <div className="ml-2">
          <Modal>
            {isAdmin && <Modal.Open opens="editMoney">
              <ButtonIcon
                className={'w-60'}


              >
                <BiSolidEditAlt />
              </ButtonIcon>
            </Modal.Open>}




            <Modal.Window name="editMoney" >
              <EditMoney exchangeRate={USDTOAED} />
            </Modal.Window>

          </Modal>
        </div>
      </div>

    </Heading>
  );
}

export default ExchangeRate;
