import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type BookmarkType = 'beach' | 'hotel' | 'pagoda';

export interface BaseBookmark {
  id: string;
  title: string;
  image?: any;
  type: BookmarkType;
}

export interface BeachBookmark extends BaseBookmark {
  type: 'beach';
}

export interface HotelBookmark extends BaseBookmark {
  type: 'hotel';
  rating?: number;
  beachName?: string;
  minRoomPrice?: number;
  bookingContext?: any;
}

export interface PagodaBookmark extends BaseBookmark {
  type: 'pagoda';
  mapLink?: string;
}

export type Bookmark = BeachBookmark | HotelBookmark | PagodaBookmark;

interface BookmarkState {
  bookmarks: Bookmark[];
}

type BookmarkAction =
  | { type: 'ADD_BOOKMARK'; payload: Bookmark }
  | { type: 'REMOVE_BOOKMARK'; payload: string };

const BOOKMARKS_STORAGE_KEY = 'bookmarks';

const bookmarkReducer = (state: BookmarkState, action: BookmarkAction): BookmarkState => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      if (state.bookmarks.some(b => b.id === action.payload.id)) {
        return state;
      }
      return {
        bookmarks: [...state.bookmarks, action.payload],
      };
    case 'REMOVE_BOOKMARK':
      return {
        bookmarks: state.bookmarks.filter(b => b.id !== action.payload),
      };
    default:
      return state;
  }
};

interface BookmarkContextType {
  bookmarks: Bookmark[];
  isBookmarked: (id: string) => boolean;
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider');
  }
  return context;
};

interface BookmarkProviderProps {
  children: ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(bookmarkReducer, { bookmarks: [] });

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        const parsed: Bookmark[] = JSON.parse(stored);
        parsed.forEach((b) => dispatch({ type: 'ADD_BOOKMARK', payload: b }));
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    }
  };

  const saveBookmarks = async (bookmarks: Bookmark[]) => {
    try {
      await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  };

  const isBookmarked = (id: string): boolean => state.bookmarks.some(b => b.id === id);

  const addBookmark = (bookmark: Bookmark) => {
    dispatch({ type: 'ADD_BOOKMARK', payload: bookmark });
    saveBookmarks([...state.bookmarks, bookmark]);
  };

  const removeBookmark = (id: string) => {
    dispatch({ type: 'REMOVE_BOOKMARK', payload: id });
    saveBookmarks(state.bookmarks.filter(b => b.id !== id));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks: state.bookmarks, isBookmarked, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

