import React, { createContext, useContext, useReducer } from 'react';

const MessageContext = createContext();

const initialState = {
  messages: [],
};

const messageReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    // Add other cases if needed
    default:
      return state;
  }
};

const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  const addMessage = (message) => {
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  };

  return (
    <MessageContext.Provider value={{ ...state, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageContext must be used within a MessageProvider');
  }
  return context;
};

export { MessageProvider, useMessageContext };
