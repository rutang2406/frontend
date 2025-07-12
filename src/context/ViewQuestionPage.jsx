import React from 'react'
import { useQA } from './QAContext'
import QuestionCard from '../components/QuestionCard'

const ViewQuestionPage = () => {
  const { questions, availableTags, selectedTags, setSelectedTags } = useQA()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.body.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const user = "Rutang"
  if (!user) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Questions</h2>
          
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
            
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagFilter(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {questions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No questions found.</p>
                {selectedTags.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Clear filters to see all questions
                  </button>
                )}
              </div>
            ) : (
              questions.map(question => (
                <QuestionCard key={question.id} question={question} />
              ))
            )}
          </div>
        </div>
      </section>
    )
    // return <div className="text-center p-4">Please login to view the question.</div>
  }

  if (!question) {
    // Redirect or fallback if no question was passed
    return <Navigate to="/" replace />
  }

  return (
    <div className="space-y-4">
            {questions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No questions found.</p>
                {selectedTags.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Clear filters to see all questions
                  </button>
                )}
              </div>
            ) : (
              questions.map(question => (
                <QuestionCard key={question.id} question={question} />
              ))
            )}
          </div>
  )
}

export default ViewQuestionPage
