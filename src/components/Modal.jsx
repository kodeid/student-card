export default function Modal({ idModal, children, width }) {
  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id={idModal} className="modal-toggle" />
      <label htmlFor={idModal} className="modal cursor-pointer">
        <label className={`modal-box relative ${width ? width : ''}`} htmlFor="">
          <label htmlFor={idModal} className="btn btn-sm btn-circle absolute right-2 top-2 z-20">
            ✕
          </label>
          {children}
        </label>
      </label>
    </>
  );
}
