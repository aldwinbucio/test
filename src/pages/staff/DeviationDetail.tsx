import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const dummyDeviations = [
  {
    id: 3,
    title: 'Nutritional Habits in Adolescents',
    researcher: 'Sarah Johnson',
    dateReported: '02/01/2023',
    type: 'Informed Consent',
    severity: 'Minor',
    status: 'Pending/View',
    description: 'The Informed Consent that was given to the participant is not the updated informed consent',
    review: '',
    correctiveAction: '',
  },
 
];

const DeviationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deviation = dummyDeviations.find(d => d.id === Number(id));
  const [severity, setSeverity] = React.useState(deviation ? deviation.severity : 'Minor');
  const [showNotif, setShowNotif] = React.useState(false);
  const [notifAnim, setNotifAnim] = React.useState(false);
  const [notifMsg, setNotifMsg] = React.useState('');
  const [notifIcon, setNotifIcon] = React.useState('👍');

  const [reviewText, setReviewText] = React.useState('');
  const [correctiveText, setCorrectiveText] = React.useState('');

  React.useEffect(() => {
    if (deviation) {
      setReviewText(deviation.review || '');
      setCorrectiveText(deviation.correctiveAction || '');
      setSeverity(deviation.severity || 'Minor');
    }
  }, [deviation]);

  const showNotification = (msg: string, icon: string = '👍') => {
    setNotifMsg(msg);
    setNotifIcon(icon);
    setShowNotif(true);
    setTimeout(() => setNotifAnim(true), 10);
  };
  const closeNotif = () => {
    setNotifAnim(false);
    setTimeout(() => setShowNotif(false), 200);
  };

  if (!deviation) {
    return <div className="p-8">Deviation not found.</div>;
  }

  return (
    <div className="p-8">
      <button className="mb-4 text-blue-600 hover:underline" onClick={() => navigate(-1)}>&larr; Back</button>
      <h2 className="text-3xl font-bold mb-2">
        <span className="text-black">Deviation:</span> <span className="text-gray-500 font-normal">{deviation.title}</span>
      </h2>
      <div className="flex gap-6 border-b mb-6 pb-2 text-[17px] font-medium">
        <div className="cursor-pointer border-b-2 border-black pb-1">General</div>
        <div className="text-gray-400 cursor-pointer">Attachments</div>
        <div className="text-gray-400 cursor-pointer">Impact</div>
        <div className="text-gray-400 cursor-pointer">Resolution</div>
        <div className="text-gray-400 cursor-pointer">Timeline</div>
      </div>
      <div className="mb-8">
        <div className="font-bold text-[20px] mb-4">Deviation details</div>
        <div className="grid grid-cols-3 gap-2 items-center mb-2">
          <div className="text-gray-500 col-span-1">Deviation type</div>
          <div className="col-span-2 flex gap-6 items-center">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                checked={severity === 'Major'}
                onChange={() => setSeverity('Major')}
                className="accent-red-500"
                name="deviation-severity"
              /> Major
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                checked={severity === 'Minor'}
                onChange={() => setSeverity('Minor')}
                className="accent-blue-700"
                name="deviation-severity"
              /> Minor
            </label>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 items-center mb-2">
          <div className="text-gray-500 col-span-1">Researcher Name</div>
          <div className="col-span-2">{deviation.researcher}</div>
        </div>
        <div className="grid grid-cols-3 gap-2 items-center mb-2">
          <div className="text-gray-500 col-span-1">Deviation description</div>
          <div className="col-span-2">{deviation.description || 'No description provided.'}</div>
        </div>
      </div>
      <div className="flex gap-8 mt-8">
        <div className="flex-1 border border-red-200 rounded-xl p-6 min-h-[120px] bg-gray-50 flex flex-col">
          <div className="font-semibold mb-2 text-[18px]">Deviation review</div>
          <textarea
            className="mb-4 text-gray-700 text-base flex-1 whitespace-pre-line bg-gray-100 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
            rows={4}
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            placeholder="Enter deviation review..."
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-fit mt-auto"
            onClick={() => showNotification('Deviation Result has been sent to the Researcher', '👍')}
          >
            Approve
          </button>
        </div>
        <div className="flex-1 border border-red-200 rounded-xl p-6 min-h-[120px] bg-gray-50 flex flex-col">
          <div className="font-semibold mb-2 text-[18px]">Require Corrective Action</div>
          <textarea
            className="mb-4 text-gray-700 text-base flex-1 whitespace-pre-line bg-gray-100 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
            rows={4}
            value={correctiveText}
            onChange={e => setCorrectiveText(e.target.value)}
            placeholder="Enter corrective action..."
          />
          <button
            className="text-black font-semibold w-fit mt-auto"
            onClick={() => showNotification('Corrective action required!', '⚠️')}
          >
            Click Here &rarr;
          </button>
        </div>
      </div>
      {/* Animated na notification */}
      {showNotif && (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/10 transition-opacity duration-200 ${notifAnim ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`bg-white rounded-2xl shadow-2xl p-10 min-w-[400px] min-h-[180px] flex items-center relative transition-all duration-200 ${notifAnim ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`} style={{ boxShadow: '0 8px 32px 0 rgba(60,60,60,0.12)' }}>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold"
              onClick={closeNotif}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex items-center gap-4 mx-auto">
              <span className="text-4xl bg-yellow-100 rounded-lg p-3">{notifIcon}</span>
              <span className="font-semibold text-lg">{notifMsg}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviationDetail;
