const { test, expect } = require('@playwright/test');

test.describe('Deck of Cards API - Blackjack Test', () => {
  test('Navigate to API, get and shuffle a deck, deal cards, and check for blackjack', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Step 1: Navigate to https://deckofcardsapi.com/
    await page.goto('https://deckofcardsapi.com/');

    // Step 2: Confirm the site is up by checking for the presence of .title element
    const isTitleVisible = await page.isVisible('.title');
    expect(isTitleVisible, 'Site is up').toBeTruthy();

    // Step 3: Get a new deck
    const newDeckResponse = await context.request.get('https://deckofcardsapi.com/api/deck/new/');
    expect(newDeckResponse.ok(), 'New deck should be fetched').toBeTruthy();

    const newDeckData = await newDeckResponse.json();
    const deckId = newDeckData.deck_id;
    expect(deckId, 'Deck ID should be defined').toBeDefined();

    // Step 4: Shuffle it
    const shuffleResponse = await context.request.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
    expect(shuffleResponse.ok(), 'Deck should be shuffled').toBeTruthy();

    // Step 5: Deal three cards to each of two players
    const player1Response = await context.request.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`);
    const player1Data = await player1Response.json();
    expect(player1Data.cards.length, 'Player 1 should have 3 cards').toBe(3);

    const player2Response = await context.request.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`);
    const player2Data = await player2Response.json();
    expect(player2Data.cards.length, 'Player 2 should have 3 cards').toBe(3);

    // Step 6: Check whether either has blackjack
    function hasBlackjack(player) {
      const ace = player.cards.some(card => card.value === 'ACE');
      const tenValueCard = player.cards.some(card => ['10', 'JACK', 'QUEEN', 'KING'].includes(card.value));
      return ace && tenValueCard;
    }

    const player1Blackjack = hasBlackjack(player1Data);
    const player2Blackjack = hasBlackjack(player2Data);

    console.log("Player 1 has got: ", player1Data);
    console.log("Player 1 has got: ", player2Data);

    // Step 7: If either has, write out which one does
    if (player1Blackjack && player2Blackjack) {
        console.log('Both players have blackjack.');
    } else if (player1Blackjack) {
      console.log('Player 1 has blackjack!');
    } else if (player2Blackjack) {
      console.log('Player 2 has blackjack!');
    } else {
      console.log('Neither player has blackjack.');
    }
    
    await page.close();
  });
});
