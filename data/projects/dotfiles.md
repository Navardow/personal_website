## ~/.dotfiles

_Dotfiles for my computers (pc and laptop, or any other computers I may acquire in the future)._
_Configuration is subject to frequent updates and changes. Documentation may not accurately reflect configuration files._

### _"I use arch btw"_

I previously owned a MacBook Air and ran Windows on my PC. Wanting to learn more about Linux,
I impulsively sold my MacBook, bought a cheap used Lenovo ThinkPad T14 Gen 1, and that's
where it all began. This was all done in the name of learning — and what better way to
learn than to throw yourself into the fire and figure it out?

My distro wasn't chosen by me — I was chosen by my distro. "I use Arch btw." In my search,
it felt like a badge of honor to be able to say you were an Arch Linux user. The memes and
parody videos made Arch out to be this forbidden piece of software — a power-user distro
meant for seasoned veterans of the kernel. All the available information came with a "newbie
beware" warning sign attached, and that's when I knew it was meant for me.

I've learned a lot since switching to Arch — from breaking my laptop and rendering it unusable
in the early days, to now writing my own small custom scripts to speed up everyday processes
and make my life easier. The thing I love most about the distro is its do-it-yourself attitude,
especially if you opt to go the no-DE (Desktop Environment) route.

I'll go over what I've done myself and talk about some of what I've learned so far. This is my
dotfiles — what makes my computer uniquely mine.

### Ricing

![image of the definition of ricing](/assets/dotfilesimgs/ricingdef.png)

I've chosen to go the minimal route when it comes to ricing.

For my compositor, I've chosen **niri**. No other window manager appealed to me — of course,
every window manager has workspaces, but the way windows were laid out just didn't make sense.
Take Hyprland, for example: as you add windows to a workspace, they get smaller each time,
until they're illegible. Niri instead offers an infinite horizontal tiling space within each
workspace — letting you stack windows vertically and adjust their width and height — along
with an infinite number of workspaces stacked vertically.

I won't bore you with the thought process behind all of my ricing decisions. Here's the rest of the setup:

- &emsp;Terminal - Alacritty

- &emsp;Application Launcher - Fuzzel

- &emsp;Notification Daemon - Mako

- &emsp;Status Bar - Waybar

- &emsp;Screen Lock - Swaylock

- &emsp;Wallpaper Manager - Waypaper + Swaybg

Configuration files are available at _https://www.github.com/NavardoW/dotfiles/_

![Image of homescreen](/assets/dotfilesimgs/desktop_screenshot.png)

### Practical Tools

Now that we've looked at ricing, let's turn to something more important: the practicality
of owning a Linux machine, especially as a computer science student.

**Code Editor - Neovim**  
I was always accustomed to writing code in editors such as VSCode, Visual Studio,
Eclipse, Xcode, or a JetBrains IDE. All of them are very easy to install and get started with.
The problem I had with that was that oftentimes, beyond the code I'd written,
I had no clue what was going on behind the scenes.

After switching to Linux, I made the decision to switch my code editor to Neovim. Since then, I've learned
a lot about what our computers actually do with the code we write. I've spent a
lot more time in the command line, setting up projects manually, and learning more
about compilers than I ever would have before — configuring CMake files, and so on.
My Neovim configuration is tuned exactly to my liking, with nothing more than what I deem necessary.
I've learned about LSPs (Language Server Protocols), how formatting actually works, demystified what used
to seem like magic in conventional code editors, etc. Not to mention my typing greatly improved.

**Neovim config:** _https://www.github.com/NavardoW/nvim-config/_

**Tmux**  
Tmux is one of the best pieces of software I've come across. It lets you switch between projects — called
sessions — and have them persist as long as your system stays powered on. I won't go into detail, since there
are plenty of resources on it already, but it's a great way to work on multiple projects at once, or step
away and pick up exactly where you left off later.

Tmux also supports attaching to a session remotely from another machine. Forgot to commit and push your
changes before leaving your desk? SSH back in, reattach to the session, and finish the job —
no lost context, no starting over.

### Is Arch Linux worth it as a computer science student?

Absolutely. There is a lot more to computer science than just programming. Switching to Linux
isn't some holy grail that will make you a master computer scientist, but becoming a Linux
user forced me to learn more about computers than I ever would have before.

I've had to understand how my system boots, how packages are built and managed, how processes
talk to the kernel, and how all the pieces I used to take for granted actually fit together.
None of that shows up on a transcript, but it's changed how I think about the tools I use every day,
given me a better understanding of computers at a lower level, and made me a more capable developer because of it.

There's plenty more benefits to using Linux that I can write about, but this would be too long.
I'll save the rest for another time.
<br>
<br>
<br>
_Navardo Williams - Aug 22, 2026_
