'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { NT2, MS } from '../data/appData.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [cash, setCash] = useState(12.50);
  const [points, setPoints] = useState(240);
  const [steps, setSteps] = useState(6420);
  const [goal, setGoal] = useState(8000);
  const [activeMins, setActiveMins] = useState(12);
  const [streak, setStreak] = useState(7);
  const [hydration, setHydration] = useState(3); // 3 glasses logged
  const [completedMissions, setCompletedMissions] = useState({ 0: true });
  const [completedLessons, setCompletedLessons] = useState({ 0: [0, 1, 2], 3: [0, 1, 2, 3] });
  const [joinedProgrammes, setJoinedProgrammes] = useState({ 0: true, 3: true });
  const [joinedChallenges, setJoinedChallenges] = useState({ 0: true, 2: true });
  
  const [notifications, setNotifications] = useState(NT2);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  
  const [units, setUnits] = useState('metric');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [toasts, setToasts] = useState([]);
  
  // Exercise modal & Workout session state
  const [previewExercise, setPreviewExercise] = useState(null);
  const [activeWorkout, setActiveWorkout] = useState(null);

  const [walks, setWalks] = useState([
    ['Yesterday, evening walk', '7,400 steps', '61 min'],
    ['Monday, morning walk', '5,200 steps', '44 min']
  ]);

  const [history, setHistory] = useState([
    ['Withdrawal (USDT)', '−$10.00', 'Paid'],
    ['Referral commission', '+$2.00', 'Paid'],
    ['Challenge reward', '+120 pts', 'Done']
  ]);

  // Load saved preferences if available
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('fp_theme');
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.body.setAttribute('data-theme', savedTheme);
      }
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('fp_theme', next);
      document.documentElement.setAttribute('data-theme', next);
      document.body.setAttribute('data-theme', next);
    } catch (e) {}
  };

  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const markMissionDone = (index) => {
    if (completedMissions[index]) return;
    const mission = MS[index];
    const pts = mission ? mission[3] : 20;
    const mins = mission ? mission[4] : 5;

    setCompletedMissions((prev) => ({ ...prev, [index]: true }));
    setPoints((p) => p + pts);
    setActiveMins((m) => Math.min(60, m + mins));
    showToast(`Mission complete! +${pts} points earned`);
  };

  const logQuickActivity = (mins = 5, pts = 5) => {
    setActiveMins((m) => Math.min(60, m + mins));
    setPoints((p) => p + pts);
    showToast(`${mins} minutes logged · +${pts} points`);
  };

  const addHydration = (glasses = 1) => {
    setHydration((h) => {
      const next = Math.min(12, h + glasses);
      showToast(`+${glasses * 250}ml logged · ${next * 250}ml total`);
      return next;
    });
  };

  const joinProgramme = (progId) => {
    setJoinedProgrammes((prev) => ({ ...prev, [progId]: true }));
    showToast('Enrolled in programme!');
  };

  const toggleLesson = (progId, lessonIdx) => {
    setCompletedLessons((prev) => {
      const current = prev[progId] || [];
      const exists = current.includes(lessonIdx);
      const updated = exists ? current.filter((i) => i !== lessonIdx) : [...current, lessonIdx];
      if (!exists) {
        setPoints((p) => p + 15);
        showToast('Lesson marked complete · +15 points');
      }
      return { ...prev, [progId]: updated };
    });
  };

  const joinChallenge = (chId) => {
    setJoinedChallenges((prev) => {
      const isJoined = prev[chId];
      if (isJoined) {
        showToast('Already participating in challenge');
        return prev;
      }
      showToast('Joined community challenge! Good luck!');
      return { ...prev, [chId]: true };
    });
  };

  const markNotificationsRead = () => {
    setUnreadNotifications(0);
    showToast('All notifications marked as read');
  };

  const requestWithdrawal = (amount, method, destination) => {
    if (amount > cash) {
      showToast('Insufficient cash balance');
      return false;
    }
    setCash((c) => c - amount);
    setHistory((prev) => [
      [`Withdrawal (${method})`, `−$${amount.toFixed(2)}`, 'Processing'],
      ...prev
    ]);
    showToast(`Withdrawal of $${amount.toFixed(2)} requested`);
    return true;
  };

  const startWorkout = (exercises, duration = 40, rest = 15) => {
    setActiveWorkout({
      exercises: exercises && exercises.length ? exercises : ['Jumping Jacks', 'Bodyweight Squats', 'Plank Hold'],
      duration,
      rest,
      index: 0,
      phase: 'prepare', // 'prepare' | 'work' | 'rest' | 'done'
      timeLeft: 3
    });
  };

  const finishWorkout = () => {
    if (activeWorkout) {
      setPoints((p) => p + 50);
      setActiveMins((m) => m + 15);
      showToast('Workout finished! Great job! +50 points');
    }
    setActiveWorkout(null);
  };

  const closeWorkout = () => {
    setActiveWorkout(null);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        cash,
        points,
        steps,
        goal,
        activeMins,
        streak,
        hydration,
        completedMissions,
        completedLessons,
        joinedProgrammes,
        joinedChallenges,
        notifications,
        unreadNotifications,
        units,
        setUnits,
        soundEnabled,
        setSoundEnabled,
        walks,
        history,
        toasts,
        showToast,
        markMissionDone,
        logQuickActivity,
        addHydration,
        joinProgramme,
        toggleLesson,
        joinChallenge,
        markNotificationsRead,
        requestWithdrawal,
        previewExercise,
        setPreviewExercise,
        activeWorkout,
        startWorkout,
        finishWorkout,
        closeWorkout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

