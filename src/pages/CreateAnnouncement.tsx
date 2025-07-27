import React, { useState } from 'react';


export default function CreateAnnouncement() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState<'students' | 'committee' | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create an announcement</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter announcement title"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            placeholder="Enter announcement description"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring min-h-[80px]"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Attachments</label>
          <label className="w-full border rounded px-3 py-2 text-gray-500 cursor-pointer flex items-center">
            + Add Attachments
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleAttachment}
            />
          </label>
          {attachments.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600">
              {attachments.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Audience</label>
          <div className="flex gap-3">
            <button
              type="button"
              className={`border rounded px-4 py-1 ${audience === 'students' ? 'bg-black text-white' : ''}`}
              onClick={() => setAudience('students')}
            >
              All Students
            </button>
            <button
              type="button"
              className={`border rounded px-4 py-1 ${audience === 'committee' ? 'bg-black text-white' : ''}`}
              onClick={() => setAudience('committee')}
            >
              Committee
            </button>
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Preview</label>
          <div className="rounded-xl border-2 border-dashed border-gray-400 h-48 flex items-end bg-white">
            <div className="p-4 m-4 max-w-md w-full">
              <div className="font-semibold text-lg mb-1">{title || 'Announcement Title'}</div>
              <div className="text-sm whitespace-pre-line">{description || 'Announcement description will appear here.'}</div>
              <div className="mt-2 text-xs text-gray-500">
                {audience ? `Audience: ${audience === 'students' ? 'All Students' : 'Committee'}` : 'Select audience'}
              </div>
              {attachments.length > 0 && (
                <div className="mt-2 text-xs text-gray-400">
                  Attachments: {attachments.map(f => f.name).join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button className="text-gray-500 hover:underline" type="button">Cancel</button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" type="button">Announce</button>
        </div>
      </div>
    </div>
  );
}
