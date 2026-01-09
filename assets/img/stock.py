import yfinance as yf
import streamlit as st

st.write("""
# Simple Stock Price App
Shown are the stock closing price and volume of Gold!
""")

tickerSymbol = '^XAU'
tickerData = yf.Ticker(tickerSymbol)
tickerDf = tickerData.history(period='1d', start='2022-01-13', end='2022-11-13')

st.line_chart(tickerDf.Close)
st.line_chart(tickerDf.Volume)

# streamlit run "d:/Repos/Project/python/(freecodecamp) Tutorial/01. simple stock price/stock.py" 