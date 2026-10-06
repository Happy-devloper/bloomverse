export default function MessageEditor({
  recipientName,
  senderName,
  message,
  onRecipientNameChange,
  onSenderNameChange,
  onMessageChange,
}) {
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal mb-1">
          Write Your Message
        </h2>
        <p className="text-xs text-gray-500 font-light">
          Add names and a personal note to accompany the gift card.
        </p>
      </div>
      
      <div className="space-y-5 text-left">
        {/* Recipient Name Field */}
        <div>
          <label className="block text-xs font-semibold text-charcoal/80 uppercase tracking-[1px] mb-2">
            To (Recipient Name)
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => onRecipientNameChange(e.target.value)}
            maxLength={50}
            placeholder="Enter their name (e.g., Sarah)"
            style={{ minHeight: '48px' }}
            className="w-full px-4 py-2 border border-[#E85D75]/25 rounded-[16px] focus:outline-none focus:border-rose-pink focus:bg-[#FFF2F4]/30 transition-all font-body text-charcoal text-sm placeholder-gray-300"
          />
          <div className="flex justify-end mt-1">
            <span className="text-[10px] text-gray-400 font-mono">{recipientName.length}/50</span>
          </div>
        </div>

        {/* Sender Name Field */}
        <div>
          <label className="block text-xs font-semibold text-charcoal/80 uppercase tracking-[1px] mb-2">
            From (Your Name)
          </label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => onSenderNameChange(e.target.value)}
            maxLength={50}
            placeholder="Enter your name (e.g., John)"
            style={{ minHeight: '48px' }}
            className="w-full px-4 py-2 border border-[#E85D75]/25 rounded-[16px] focus:outline-none focus:border-rose-pink focus:bg-[#FFF2F4]/30 transition-all font-body text-charcoal text-sm placeholder-gray-300"
          />
          <div className="flex justify-end mt-1">
            <span className="text-[10px] text-gray-400 font-mono">{senderName.length}/50</span>
          </div>
        </div>

        {/* Custom Message Field */}
        <div>
          <label className="block text-xs font-semibold text-charcoal/80 uppercase tracking-[1px] mb-2">
            Personal Note
          </label>
          <textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            maxLength={250}
            placeholder="Write a warm note of celebration, thanks, or love..."
            rows={4}
            className="w-full px-4 py-3 border border-[#E85D75]/25 rounded-[16px] focus:outline-none focus:border-rose-pink focus:bg-[#FFF2F4]/30 transition-all font-body text-charcoal text-sm placeholder-gray-300 resize-none leading-relaxed"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] text-gray-300 italic font-light">Max 250 characters</span>
            <span className="text-[10px] text-gray-400 font-mono">{message.length}/250</span>
          </div>
        </div>
      </div>
    </div>
  );
}
