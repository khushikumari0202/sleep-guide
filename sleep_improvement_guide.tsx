import React, { useState } from 'react';
import { Moon, Sun, Clock, CheckCircle, Circle } from 'lucide-react';

const SleepImprovementGuide = () => {
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [bedtime, setBedtime] = useState('');
  const [wakeTime, setWakeTime] = useState('');

  const sleepIssues = [
    { id: 'falling-asleep', label: 'Trouble falling asleep', icon: '😴' },
    { id: 'staying-asleep', label: 'Waking up during the night', icon: '🌙' },
    { id: 'waking-tired', label: 'Waking up tired', icon: '😪' },
    { id: 'irregular-schedule', label: 'Irregular sleep schedule', icon: '⏰' },
    { id: 'stress-anxiety', label: 'Stress/anxiety keeping me awake', icon: '😰' }
  ];

  const habits = {
    'falling-asleep': [
      'Create a relaxing bedtime routine (reading, gentle stretches)',
      'Avoid screens 1 hour before bed',
      'Keep bedroom cool (65-68°F)',
      'Try progressive muscle relaxation',
      'Avoid caffeine after 2 PM'
    ],
    'staying-asleep': [
      'Keep bedroom completely dark',
      'Use white noise or earplugs',
      'Avoid large meals 3 hours before bed',
      'Keep a consistent sleep schedule',
      'Limit alcohol consumption'
    ],
    'waking-tired': [
      'Aim for 7-9 hours of sleep',
      'Go to bed and wake up at the same time daily',
      'Get morning sunlight exposure',
      'Avoid hitting snooze button',
      'Check for sleep disorders if persistent'
    ],
    'irregular-schedule': [
      'Set a consistent bedtime and wake time',
      'Use a sleep tracking app',
      'Create bedtime reminders',
      'Gradually shift schedule by 15 minutes if needed',
      'Prioritize sleep as non-negotiable'
    ],
    'stress-anxiety': [
      'Practice deep breathing or meditation',
      'Keep a journal to process thoughts',
      'Try the 4-7-8 breathing technique',
      'Create a worry list earlier in the day',
      'Consider talking to a therapist'
    ]
  };

  const toggleIssue = (issueId) => {
    setSelectedIssues(prev => 
      prev.includes(issueId) 
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const toggleHabit = (habit) => {
    setCompletedHabits(prev =>
      prev.includes(habit)
        ? prev.filter(h => h !== habit)
        : [...prev, habit]
    );
  };

  const getRecommendedHabits = () => {
    const allHabits = selectedIssues.flatMap(issue => habits[issue] || []);
    return [...new Set(allHabits)]; // Remove duplicates
  };

  const calculateSleepDuration = () => {
    if (!bedtime || !wakeTime) return null;
    
    const bedDate = new Date(`1970-01-01T${bedtime}:00`);
    let wakeDate = new Date(`1970-01-01T${wakeTime}:00`);
    
    if (wakeDate < bedDate) {
      wakeDate = new Date(`1970-01-02T${wakeTime}:00`);
    }
    
    const diff = (wakeDate - bedDate) / (1000 * 60 * 60);
    return diff;
  };

  const sleepDuration = calculateSleepDuration();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Moon className="text-indigo-600" />
            Sleep Improvement Guide
            <Sun className="text-yellow-500" />
          </h1>
          <p className="text-gray-600">Personalize your path to better sleep</p>
        </div>

        {/* Sleep Schedule Calculator */}
        <div className="mb-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="text-blue-600" />
            Your Sleep Schedule
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Bedtime</label>
              <input
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Wake Time</label>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          {sleepDuration && (
            <div className={`p-3 rounded-lg ${sleepDuration >= 7 && sleepDuration <= 9 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              <strong>Sleep Duration: {sleepDuration.toFixed(1)} hours</strong>
              {sleepDuration >= 7 && sleepDuration <= 9 
                ? ' ✅ Perfect! You\'re in the recommended range.'
                : sleepDuration < 7 
                  ? ' ⚠️ Try to get 7-9 hours for optimal health.'
                  : ' ⚠️ You might be oversleeping. 7-9 hours is typically ideal.'
              }
            </div>
          )}
        </div>

        {/* Issue Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">What sleep challenges are you facing?</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {sleepIssues.map(issue => (
              <button
                key={issue.id}
                onClick={() => toggleIssue(issue.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedIssues.includes(issue.id)
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-xl mr-3">{issue.icon}</span>
                {issue.label}
              </button>
            ))}
          </div>
        </div>

        {/* Personalized Recommendations */}
        {selectedIssues.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Personalized Sleep Habits</h2>
            <p className="text-gray-600 mb-4">
              Based on your challenges, here are the most effective habits to focus on:
            </p>
            <div className="space-y-3">
              {getRecommendedHabits().map((habit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => toggleHabit(habit)}
                >
                  {completedHabits.includes(habit) ? (
                    <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  ) : (
                    <Circle className="text-gray-400 flex-shrink-0" size={20} />
                  )}
                  <span className={completedHabits.includes(habit) ? 'line-through text-gray-500' : ''}>
                    {habit}
                  </span>
                </div>
              ))}
            </div>
            
            {completedHabits.length > 0 && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">
                  Great progress! You've completed {completedHabits.length} out of {getRecommendedHabits().length} recommended habits. 🎉
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Tips */}
        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">💡 Quick Sleep Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>The 10-3-2-1-0 Rule:</strong>
              <ul className="mt-1 space-y-1 text-gray-600">
                <li>• 10 hrs before: No more caffeine</li>
                <li>• 3 hrs before: No more food/alcohol</li>
                <li>• 2 hrs before: No more work</li>
                <li>• 1 hr before: No more screens</li>
                <li>• 0: Number of times you hit snooze</li>
              </ul>
            </div>
            <div>
              <strong>Sleep Environment:</strong>
              <ul className="mt-1 space-y-1 text-gray-600">
                <li>• Temperature: 65-68°F (18-20°C)</li>
                <li>• Darkness: Blackout curtains or eye mask</li>
                <li>• Quiet: Earplugs or white noise</li>
                <li>• Comfort: Quality mattress and pillows</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepImprovementGuide;