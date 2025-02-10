import React, { useState } from "react";
import { Modal } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ReactMultiEmail } from "react-multi-email";
import { setOpenShareModal } from "../redux/reducers/ModalReducer";
import "react-multi-email/dist/style.css";

const ShareModal = () => {
	const dispatch = useDispatch();
	const open = useSelector(store => store.ModalReducer.openShareModal);
	const [notify, setNotify] = useState(true);
	const [emails, setEmails] = useState([]);

	const share = () => {
		close()
	}

	const close = async () => {
		dispatch(setOpenShareModal());
	};

	return (
		<Modal open={open} onClose={close}>
			<div className="fixed top-1/2 md:top-[103px] left-1/2 -translate-y-1/2 md:translate-y-0 -translate-x-1/2 bg-black2 border border-black5 outline-none rounded-[10px] shadow-lg w-[335px] md:w-[450px]">
				<div className="flex flex-col border-b border-black3 py-[30px] px-4 md:p-[30px] relative overflow-hidden">
					<button className="flex justify-center items-center w-[35px] h-[35px] absolute top-0 right-0 bg-black3 rounded-tr-[5px] rounded-bl-[5px]" onClick={close}>
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 1L11 11M1 11L11 1" stroke="#6A7179" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
					<span className="font-semibold text-[20px] md:text-[24px] leading-[23.87px] md:leading-[28.64px] text-center">Share Dopple Privately</span>
					<span className="mt-[15px] text-[12px] leading-[18px] text-center">You can invite others to view your private dopple by entering in their email addresses below.</span>
					<span className="mt-[15px] text-[12px] leading-[18px]">Invitees</span>
					{/* <div className="flex flex-wrap items-center gap-[5px] mt-[10px] bg-black2 border border-black3 rounded-[5px] p-[15px] text-[12px] leading-[14.32px] placeholder-black4">
						<div className="flex justify-center items-center space-x-[5px] px-[10px] py-[5px] rounded-[100px] bg-black4">
							<span>johndoe2023@gmail.com</span>
							<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.4581 5.67414C10.5236 5.61307 10.5765 5.5397 10.6136 5.45822C10.6507 5.37674 10.6715 5.28874 10.6746 5.19925C10.6777 5.10976 10.6632 5.02052 10.6319 4.93664C10.6005 4.85277 10.5529 4.77588 10.4919 4.71039C10.4308 4.64489 10.3575 4.59206 10.276 4.55492C10.1945 4.51778 10.1065 4.49705 10.017 4.49391C9.9275 4.49078 9.83827 4.5053 9.75439 4.53665C9.67051 4.56801 9.59363 4.61557 9.52813 4.67664L7.53313 6.53664L5.67313 4.54095C5.54868 4.41348 5.37928 4.33979 5.20117 4.33563C5.02307 4.33148 4.85042 4.3972 4.72016 4.51873C4.5899 4.64026 4.51238 4.80795 4.50418 4.98591C4.49599 5.16387 4.55777 5.33797 4.67631 5.47095L6.53631 7.46595L4.54063 9.32595C4.47282 9.3864 4.41777 9.45979 4.37872 9.5418C4.33967 9.62382 4.3174 9.71281 4.31322 9.80356C4.30904 9.8943 4.32304 9.98497 4.35439 10.0702C4.38574 10.1555 4.43381 10.2336 4.49578 10.3C4.55775 10.3665 4.63237 10.4198 4.71525 10.457C4.79813 10.4942 4.88761 10.5144 4.97842 10.5166C5.06924 10.5187 5.15956 10.5026 5.24409 10.4693C5.32861 10.4361 5.40563 10.3862 5.47063 10.3228L7.46563 8.46345L9.32563 10.4585C9.38569 10.5275 9.45904 10.5838 9.5413 10.6239C9.62357 10.664 9.71306 10.6871 9.80446 10.6919C9.89586 10.6967 9.98729 10.6831 10.0733 10.6518C10.1593 10.6205 10.2381 10.5722 10.3051 10.5098C10.372 10.4473 10.4257 10.3721 10.4629 10.2885C10.5002 10.2049 10.5202 10.1146 10.5218 10.0231C10.5235 9.93163 10.5066 9.84073 10.4724 9.75586C10.4381 9.67099 10.3871 9.59388 10.3225 9.52914L8.46313 7.53414L10.4581 5.67414Z" fill="white"/>
								<path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5C0 3.35795 3.35795 0 7.5 0C11.642 0 15 3.35795 15 7.5C15 11.642 11.642 15 7.5 15C3.35795 15 0 11.642 0 7.5ZM7.5 13.6364C6.69416 13.6364 5.89621 13.4776 5.15172 13.1693C4.40722 12.8609 3.73075 12.4089 3.16094 11.8391C2.59112 11.2692 2.13912 10.5928 1.83074 9.84828C1.52236 9.10379 1.36364 8.30584 1.36364 7.5C1.36364 6.69416 1.52236 5.89621 1.83074 5.15172C2.13912 4.40722 2.59112 3.73075 3.16094 3.16094C3.73075 2.59112 4.40722 2.13912 5.15172 1.83074C5.89621 1.52236 6.69416 1.36364 7.5 1.36364C9.12747 1.36364 10.6883 2.01014 11.8391 3.16094C12.9899 4.31173 13.6364 5.87254 13.6364 7.5C13.6364 9.12747 12.9899 10.6883 11.8391 11.8391C10.6883 12.9899 9.12747 13.6364 7.5 13.6364Z" fill="white"/>
							</svg>
						</div>
						<input className="" placeholder="Enter email here" />
					</div> */}
					<ReactMultiEmail
						placeholder="Enter email here"
						emails={emails}
						onChange={_emails => setEmails(_emails)}
						getLabel={(email, index, removeEmail) => {
							return (
								<div className="flex justify-center items-center space-x-[5px] px-[10px] py-[5px] rounded-[100px] bg-black4 chip" data-tag key={index}>
									<span data-tag-item className="text-white">{email}</span>
									<svg data-tag-handle width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => removeEmail(index)}>
										<path d="M10.4581 5.67414C10.5236 5.61307 10.5765 5.5397 10.6136 5.45822C10.6507 5.37674 10.6715 5.28874 10.6746 5.19925C10.6777 5.10976 10.6632 5.02052 10.6319 4.93664C10.6005 4.85277 10.5529 4.77588 10.4919 4.71039C10.4308 4.64489 10.3575 4.59206 10.276 4.55492C10.1945 4.51778 10.1065 4.49705 10.017 4.49391C9.9275 4.49078 9.83827 4.5053 9.75439 4.53665C9.67051 4.56801 9.59363 4.61557 9.52813 4.67664L7.53313 6.53664L5.67313 4.54095C5.54868 4.41348 5.37928 4.33979 5.20117 4.33563C5.02307 4.33148 4.85042 4.3972 4.72016 4.51873C4.5899 4.64026 4.51238 4.80795 4.50418 4.98591C4.49599 5.16387 4.55777 5.33797 4.67631 5.47095L6.53631 7.46595L4.54063 9.32595C4.47282 9.3864 4.41777 9.45979 4.37872 9.5418C4.33967 9.62382 4.3174 9.71281 4.31322 9.80356C4.30904 9.8943 4.32304 9.98497 4.35439 10.0702C4.38574 10.1555 4.43381 10.2336 4.49578 10.3C4.55775 10.3665 4.63237 10.4198 4.71525 10.457C4.79813 10.4942 4.88761 10.5144 4.97842 10.5166C5.06924 10.5187 5.15956 10.5026 5.24409 10.4693C5.32861 10.4361 5.40563 10.3862 5.47063 10.3228L7.46563 8.46345L9.32563 10.4585C9.38569 10.5275 9.45904 10.5838 9.5413 10.6239C9.62357 10.664 9.71306 10.6871 9.80446 10.6919C9.89586 10.6967 9.98729 10.6831 10.0733 10.6518C10.1593 10.6205 10.2381 10.5722 10.3051 10.5098C10.372 10.4473 10.4257 10.3721 10.4629 10.2885C10.5002 10.2049 10.5202 10.1146 10.5218 10.0231C10.5235 9.93163 10.5066 9.84073 10.4724 9.75586C10.4381 9.67099 10.3871 9.59388 10.3225 9.52914L8.46313 7.53414L10.4581 5.67414Z" fill="white" />
										<path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5C0 3.35795 3.35795 0 7.5 0C11.642 0 15 3.35795 15 7.5C15 11.642 11.642 15 7.5 15C3.35795 15 0 11.642 0 7.5ZM7.5 13.6364C6.69416 13.6364 5.89621 13.4776 5.15172 13.1693C4.40722 12.8609 3.73075 12.4089 3.16094 11.8391C2.59112 11.2692 2.13912 10.5928 1.83074 9.84828C1.52236 9.10379 1.36364 8.30584 1.36364 7.5C1.36364 6.69416 1.52236 5.89621 1.83074 5.15172C2.13912 4.40722 2.59112 3.73075 3.16094 3.16094C3.73075 2.59112 4.40722 2.13912 5.15172 1.83074C5.89621 1.52236 6.69416 1.36364 7.5 1.36364C9.12747 1.36364 10.6883 2.01014 11.8391 3.16094C12.9899 4.31173 13.6364 5.87254 13.6364 7.5C13.6364 9.12747 12.9899 10.6883 11.8391 11.8391C10.6883 12.9899 9.12747 13.6364 7.5 13.6364Z" fill="white" />
									</svg>
								</div>
							);
						}}
					/>
					<button className="flex items-center space-x-[5px] mt-[15px] text-[12px] leading-[14.32px]" onClick={() => setNotify(!notify)}>
						<div className="flex justify-center items-center w-[20px] h-[20px] border border-black3 rounded-[5px]">
							{notify &&
								<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1 3.14286L4.6 7L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							}
						</div>
						<span>Notify via email</span>
					</button>
				</div>
				<div className="flex justify-center items-center py-[30px] px-4 md:p-[30px]">
					<button className="gradient-button gradient-button-rounded-sm gradient-button-padding-md w-full h-[40px] md:h-[50px] text-[12px] md:text-[14px] leading-[14.32px] md:leading-[16.71px]" onClick={share}>
						Done
					</button>
				</div>
			</div>
		</Modal>
	)
}

export default ShareModal;