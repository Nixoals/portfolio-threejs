export default function InternalError({ setInternalError, setGlitchButton }) {
	return (
		<>
			<section className="internal-error">
				<div className="internal-error-container">
					<h1>503 Service Temporarily Unavailable</h1>
					<p>The server is Temporarily unable to service your request due to overload or capacity problems. Please never try again to press this little red button. Try to reload, may be it will work!!!</p>

					<div className="server-apache">Apache/2.4.55(Ubuntu) Server fabulousdev.com Port 80</div>
					<div className="force-reload">
						<button
							onClick={() => {
								setInternalError(false);
								setGlitchButton(false);
							}}
						>
							Force Reload
						</button>
					</div>
				</div>
			</section>
		</>
	);
}
