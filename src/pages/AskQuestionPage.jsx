import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQA } from '../context/QAContext'
import RichTextEditor from '../components/RichTextEditor'
import TagSelector from '../components/TagSelector'

const AskQuestionPage = () => {
  const navigate = useNavigate()
  const { availableTags, addQuestion } = useQA()
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isValid = title.trim().length > 0 && content.trim().length > 0 && tags.length > 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting question:', { title, content, tags })
    if (!isValid) return

    setIsSubmitting(true)
    
    try {
      const questionId = addQuestion({
        title: title.trim(),
        content,
        tags
      })
      
      navigate(`/question/${questionId}`)
    } catch (error) {
      console.error('Error creating question:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask a Question</h1>
        <p className="text-gray-600">
          Get help from the community by asking a detailed question.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Question Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What's your programming question? Be specific."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={200}
              />
              <p className="text-sm text-gray-500 mt-1">
                {title.length}/200 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags *
              </label>
              <TagSelector
                availableTags={availableTags}
                selectedTags={tags}
                onChange={setTags}
                placeholder="Select relevant tags..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Add tags to help others find your question
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Details *
              </label>
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Provide all the details about your question. Include what you've tried, what you expected to happen, and what actually happened."
              />
              <p className="text-sm text-gray-500 mt-1">
                Use the rich text editor to format your question with code blocks, lists, and more.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`px-6 py-2 rounded-lg transition-colors ${
              isValid && !isSubmitting
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Question'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AskQuestionPage
