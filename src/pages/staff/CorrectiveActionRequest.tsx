import React, { useState } from 'react';

export default function CorrectiveActionRequest() {
  const [requiredChange, setRequiredChange] = useState('changes');
  const [additionalDocs, setAdditionalDocs] = useState('none');
  const [deviationFeedback, setDeviationFeedback] = useState('');
  const [requiredChangesText, setRequiredChangesText] = useState('');
  const [additionalDocsText, setAdditionalDocsText] = useState('');
  const [deadline, setDeadline] = useState('');

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-8">Request Corrective Action</h1>
      <div className="mb-8">
        <div className="font-bold mb-2">Deviation Feedback</div>
        <textarea
          className="border rounded-lg p-4 bg-white text-gray-800 mb-6 w-full min-h-[80px]"
          placeholder="Enter deviation feedback..."
          value={deviationFeedback}
          onChange={e => setDeviationFeedback(e.target.value)}
        />
        <div className="font-bold mb-2">Required Changes</div>
        <div className="mb-2 flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={requiredChange === 'changes'} onChange={() => setRequiredChange('changes')} />
            <span>Changes required</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={requiredChange === 'none'} onChange={() => setRequiredChange('none')} />
            <span>No changes required</span>
          </label>
        </div>
        <textarea
          className="border rounded-lg p-4 bg-white text-gray-800 mb-6 w-full min-h-[80px]"
          placeholder="Enter required changes..."
          value={requiredChangesText}
          onChange={e => setRequiredChangesText(e.target.value)}
        />
        <div className="font-bold mb-2">Additional Documents</div>
        <div className="mb-2 flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={additionalDocs === 'docs'} onChange={() => setAdditionalDocs('docs')} />
            <span>Documents required</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={additionalDocs === 'none'} onChange={() => setAdditionalDocs('none')} />
            <span>No documents required</span>
          </label>
        </div>
        <textarea
          className="w-full border rounded-lg p-4 mt-4 min-h-[80px]"
          placeholder="Enter additional documents..."
          value={additionalDocsText}
          onChange={e => setAdditionalDocsText(e.target.value)}
        />
        <div className="font-bold mt-6 mb-2">Return Deadline</div>
        <input
          type="date"
          className="bg-gray-100 rounded-lg px-4 py-2 text-gray-600 font-medium w-fit"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <button className="bg-blue-600 px-6 py-2 rounded-lg font-semibold text-white hover:bg-blue-700">Submit</button>
      </div>
    </div>
  );
}
