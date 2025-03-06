import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from "@testing-library/user-event";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("初期表示に関するテスト", () => {
  it("ポケモンクイズと表示されていること", () =>{
  render(<App />);
  expect(screen.getByText("ポケモンクイズ")).toBeInTheDocument();
});

});