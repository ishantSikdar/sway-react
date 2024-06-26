import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ElevatedWindow from "../common/ElevatedWindow";

export default function Contacts({ email, mobile, setShowContact }) {
  return (
    <ElevatedWindow close={() => setShowContact(false)} closeLabel={"Close"}>
      <div className="flex flex-col gap-2 w-[270px] p-5">

        <div className="flex">
          <div>
            <FontAwesomeIcon icon={faPhone} className="mr-5 my-2" />
          </div>
          <div>
            <p className="text-frostWhite">Mobile</p>
            <p>{mobile}</p>
          </div>
        </div>

        <div className="h-[0.1pt] my-2 w-full bg-white"></div>

        <div className="flex">
          <div>
            <FontAwesomeIcon icon={faEnvelope} className="mr-5 my-2" />
          </div>
          <div>
            <p className="text-frostWhite">Mail</p>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </ElevatedWindow >
  );
}
