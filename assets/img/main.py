import random
import glob
import sys
import pygame
from pygame.locals import *

class Game:
    def __init__(self):
        self.WINDOW_WIDTH = 640
        self.WINDOW_HEIGHT = 480
        self.FRAMES_PER_SECOND = 30
        self.BALL_WIDTH_HEIGHT = 100
        self.MAX_WIDTH = self.WINDOW_WIDTH - self.BALL_WIDTH_HEIGHT
        self.MAX_HEIGHT = self.WINDOW_HEIGHT - self.BALL_WIDTH_HEIGHT

        pygame.init()
        pygame.mixer.init()
        pygame.mixer.music.load("assets/elysian_realm.mp3")
        pygame.mixer.music.play(-1, 0.0)
        self.window = pygame.display.set_mode((self.WINDOW_WIDTH, self.WINDOW_HEIGHT))
        self.clock = pygame.time.Clock()

        self.BLACK = pygame.image.load('assets/img/bg.png')
        self.cat_image = pygame.image.load('assets/img/popcat.png')

        self.cat_rect = self.reset_cat_position()
        self.voice_lines = [f for f in glob.glob("assets/bgm/*.mp3")]

    def reset_cat_position(self):
        return pygame.Rect(random.randrange(self.MAX_WIDTH), random.randrange(self.MAX_HEIGHT), self.BALL_WIDTH_HEIGHT, self.BALL_WIDTH_HEIGHT)

    def run(self):
        while True:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()

                if event.type == pygame.MOUSEBUTTONUP:
                    if self.cat_rect.collidepoint(event.pos):
                        self.cat_rect = self.reset_cat_position()
                        cat_sound = pygame.mixer.Sound(random.choice(self.voice_lines))
                        pygame.mixer.Sound.play(cat_sound)

            self.window.blit(self.BLACK, (0, 0))
            self.window.blit(self.cat_image, self.cat_rect.topleft)
            pygame.display.update()
            self.clock.tick(self.FRAMES_PER_SECOND)

if __name__ == "__main__":
    game = Game()
    game.run()
