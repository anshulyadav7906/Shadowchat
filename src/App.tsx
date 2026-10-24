import { useMemo, useState } from 'react'
import { ArrowDownLeft, ArrowLeft, ArrowRight, Bell, Check, CheckCheck, ChevronDown, CircleHelp, Compass, Heart, Image, LockKeyhole, LogOut, MessageCircle, MoreHorizontal, Paperclip, Plus, Search, Send, Settings, ShieldCheck, Smile, Sparkles, Users, X } from 'lucide-react'

type Message = { id: number; from: 'me' | 'them'; text: string; time: string; reaction?: string }
type Friend = { id: string; name: string; avatar: string; color: string; status: string; preview: string; time: string; unread?: number }
const friends: Friend[] = [
  { id:'riya', name:'Riya Sharma', avatar:'R', color:'rose', status:'Online now', preview:'no because THAT was so funny 😭', time:'now', unread:2 },
  { id:'kabir', name:'Kabir', avatar:'K', color:'blue', status:'Active 8m ago', preview:'sent you a photo', time:'8m' },
  { id:'meher', name:'Meher', avatar:'M', color:'lilac', status:'Online now', preview:'we need a catch-up soon 💜', time:'24m' },
  { id:'arjun', name:'Arjun Verma', avatar:'A', color:'coral', status:'Active yesterday', preview:'okay deal 🤝', time:'1h' },
]
const initial: Record<string, Message[]> = {
  riya: [
    {id:1,from:'them',text:'heyyy, are we still on for tonight? ✨',time:'7:41 PM'},
    {id:2,from:'me',text:'Obviously. I would never miss our very important gossip session.',time:'7:42 PM'},
    {id:3,from:'them',text:'HAHAHA stop 😭 bring snacks this time pls',time:'7:42 PM',reaction:'😂 2'},
    {id:4,from:'me',text:'snacks are literally my love language',time:'7:43 PM'},
    {id:5,from:'them',text:'no because THAT was so funny 😭',time:'7:44 PM'},
  ],
  kabir:[{id:1,from:'them',text:'Found that place we were talking about!',time:'7:22 PM'},{id:2,from:'them',text:'sent you a photo',time:'7:23 PM'}],
  meher:[{id:1,from:'them',text:'we need a catch-up soon 💜',time:'6:58 PM'}],
  arjun:[{id:1,from:'me',text:'Saturday at 6 then?',time:'6:10 PM'},{id:2,from:'them',text:'okay deal 🤝',time:'6:11 PM'}]
}
function Logo({small=false}:{small?:boolean}) { return <div className={`brand ${small?'brand-small':''}`}><span className="brand-mark"><MessageCircle size={small?17:20} strokeWidth={2.3}/><i /></span><span>shadow<span className="brand-light">chat</span></span></div> }
function Avatar({friend,size='normal'}:{friend:Friend,size?:'normal'|'large'|'tiny'}) { return <span className={`avatar ${friend.color} ${size}`} aria-label={friend.name}>{friend.avatar}<i className={friend.status==='Online now'?'online':''}/></span> }

export default function App() {
  const [view,setView] = useState<'home'|'chat'>('home')
  const [active,setActive] = useState('riya')
  const [query,setQuery] = useState('')
  const [draft,setDraft] = useState('')
  const [showFriends,setShowFriends] = useState(false)
  const [showSettings,setShowSettings] = useState(false)
  const [showEmoji,setShowEmoji] = useState(false)
  const [notice,setNotice] = useState('')
  const [messages,setMessages] = useState(initial)
  const [muted,setMuted] = useState(false)
  const friend = friends.find(f=>f.id===active) || friends[0]
  const currentMessages = messages[active] || []
  const filtered = useMemo(()=>friends.filter(f=>`${f.name} ${f.preview}`.toLowerCase().includes(query.toLowerCase())),[query])
  function notify(text:string){setNotice(text); window.setTimeout(()=>setNotice(''),2600)}
  function send(){ if(!draft.trim()) return; setMessages(prev=>({...prev,[active]:[...(prev[active]||[]),{id:Date.now(),from:'me',text:draft.trim(),time:new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})}]})); setDraft('') }
  function openChat(id:string){setActive(id);setView('chat');setShowFriends(false)}
  return <div className="app-shell">
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
    {view==='home' ? <main className="landing">
      <nav className="top-nav"><Logo/><div className="nav-right"><span className="private-note"><LockKeyhole size={14}/> YOUR LITTLE CORNER</span><button className="button button-primary nav-cta" onClick={()=>setView('chat')}>Enter Your Circle <ArrowRight size={16}/></button></div></nav>
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"/> A SMALL SPACE FOR YOUR PEOPLE</div>
          <h1>Some things are<br/>better <span className="gradient-word">just between us.</span></h1>
          <p className="hero-sub">A little private corner of the internet for your closest people. No noise, no strangers — just the moments that matter.</p>
          <div className="hero-actions"><button className="button button-primary button-large" onClick={()=>setView('chat')}>Enter Your Circle <ArrowRight size={18}/></button><button className="button button-quiet button-large" onClick={()=>document.getElementById('how')?.scrollIntoView({behavior:'smooth'})}>How it works <ArrowDownLeft size={17}/></button></div>
          <div className="friend-proof"><div className="mini-stack"><span className="mini-avatar rose">R</span><span className="mini-avatar blue">K</span><span className="mini-avatar lilac">M</span><span className="mini-avatar coral">A</span></div><span><b>Small circle. Big memories.</b><br/><small>Made for your inner circle.</small></span></div>
        </div>
        <div className="hero-art" aria-label="Illustration of a private conversation">
          <div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="sparkle s1">✦</div><div className="sparkle s2">✧</div>
          <div className="float-tag tag-top"><span className="tag-icon"><ShieldCheck size={15}/></span><span><b>Your people only</b><small>Private by design</small></span></div>
          <div className="preview-window"><div className="preview-head"><div className="preview-heading"><span className="avatar rose tiny">R</span><span><b>The usual chaos</b><small><i className="status-dot"/> 3 friends around</small></span></div><MoreHorizontal size={20}/></div><div className="preview-body"><div className="date-divider"><span>TONIGHT, 7:42 PM</span></div><div className="preview-msg received"><span className="tiny-face rose">R</span><div><small>Riya</small><p>guys I have TEA ☕</p></div></div><div className="preview-msg sent"><p>we are SAT. DOWN. 👀</p><small>7:42 <CheckCheck size={12}/></small></div><div className="preview-msg received"><span className="tiny-face lilac">M</span><div><small>Meher</small><p>omg calling rn 😭</p></div></div><div className="preview-msg sent"><p>this is why I love us 💜</p><small>7:43 <Check size={12}/></small></div><div className="preview-typing"><span className="tiny-face blue">K</span><span className="typing-dots"><i/><i/><i/></span><small>Kabir is typing</small></div></div><div className="preview-compose"><span>Say something lovely...</span><span className="compose-send"><Send size={14}/></span></div></div>
          <div className="float-tag tag-bottom"><span className="heart-icon"><Heart size={15} fill="currentColor"/></span><span><b>A little hello goes a long way</b><small>Keep your people close</small></span></div>
        </div>
      </section>
      <section className="trust-row"><div><LockKeyhole size={17}/><span>Invite-only circle</span></div><span className="trust-sep"/><div><ShieldCheck size={17}/><span>Privacy comes first</span></div><span className="trust-sep"/><div><Heart size={17}/><span>Made for real friendships</span></div></section>
      <section id="how" className="how-section"><div className="section-kicker">SMALL CIRCLE, SAFE SPACE</div><h2>Only your people.<br/><span className="muted-heading">Only your space.</span></h2><p className="section-intro">The best conversations don't need an audience.</p><div className="feature-grid"><article className="feature-card"><span className="feature-icon purple"><Users size={21}/></span><h3>Your circle, your rules</h3><p>Connect with friends by their unique ID. No random people, no public follower counts.</p></article><article className="feature-card"><span className="feature-icon pink"><LockKeyhole size={21}/></span><h3>Privacy by intention</h3><p>Build toward a space where your conversations belong to the people in them.</p></article><article className="feature-card"><span className="feature-icon coral"><Heart size={21}/></span><h3>Little moments matter</h3><p>Share the everyday chaos, the big news, and the things only your friends get.</p></article></div></section>
      <footer className="landing-footer"><Logo small/><span>Made for your inner circle, with care. © 2026 ShadowChat</span><div><a href="#how">Privacy</a><a href="#how">Security</a><a href="#how">About</a><a href="#how">Help</a></div></footer>
    </main> : <main className="dashboard">
      <aside className="sidebar">
        <div className="side-top"><Logo small/><button className="icon-button mobile-close" aria-label="Close chat" onClick={()=>setView('home')}><X size={18}/></button></div>
        <button className="circle-switch" onClick={()=>notify('You’re viewing your private circle demo.')}><span className="circle-icon"><Users size={17}/></span><span><b>Our little circle</b><small>4 friends · private</small></span><ChevronDown size={15}/></button>
        <div className="side-search"><Search size={16}/><input aria-label="Search friends" placeholder="Find a conversation..." value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></div>
        <div className="side-label"><span>YOUR PEOPLE</span><button onClick={()=>setShowFriends(!showFriends)} aria-label="Add friend"><Plus size={16}/></button></div>
        {showFriends&&<div className="invite-panel"><b>Invite a friend</b><p>Share your ShadowChat ID to start your circle.</p><code>shadow_7K4P9X</code><button onClick={()=>notify('Demo ID copied: shadow_7K4P9X')}>Copy my ID</button></div>}
        <div className="friend-list">{filtered.map(f=><button key={f.id} className={`friend-row ${active===f.id?'selected':''}`} onClick={()=>openChat(f.id)}><Avatar friend={f}/><span className="friend-meta"><b>{f.name}</b><small>{f.preview}</small></span><span className="friend-side"><small>{f.time}</small>{f.unread&&active!==f.id?<i className="unread-count">{f.unread}</i>:null}</span></button>)}</div>
        <div className="side-bottom"><div className="profile-row"><span className="avatar me-avatar">Y</span><span className="friend-meta"><b>You</b><small><i className="status-dot"/> In your own world</small></span><button className="icon-button" aria-label="Profile settings" onClick={()=>setShowSettings(!showSettings)}><Settings size={17}/></button></div>{showSettings&&<div className="settings-panel"><b>Quick settings</b><label><input type="checkbox" checked={muted} onChange={e=>setMuted(e.target.checked)}/> Mute notifications</label><button onClick={()=>notify('Account management requires backend setup.')}>Account & devices</button><button onClick={()=>setView('home')}>Back to welcome</button></div>}</div>
      </aside>
      <section className="chat-area">
        <header className="chat-header"><button className="icon-button back-button" aria-label="Back to conversations" onClick={()=>setView('home')}><ArrowLeft size={19}/></button><Avatar friend={friend}/><div className="chat-person"><b>{friend.name}</b><small><i className={`status-dot ${friend.status==='Online now'?'':'offline'}`}/>{friend.status}</small></div><div className="header-actions"><button className="icon-button" aria-label="Search conversation" onClick={()=>notify('Conversation search is ready for backend integration.')}><Search size={18}/></button><button className="icon-button" aria-label="Conversation details" onClick={()=>notify('Conversation details will be available with accounts.')}><MoreHorizontal size={20}/></button></div></header>
        <div className="privacy-banner"><LockKeyhole size={14}/><span>This is your private space with <b>{friend.name.split(' ')[0]}</b>.</span><button aria-label="Privacy details" onClick={()=>notify('This frontend preview does not yet provide end-to-end encryption.')}>Learn more</button></div>
        <div className="messages-area"><div className="conversation-intro"><Avatar friend={friend} size="large"/><h2>You and {friend.name.split(' ')[0]}</h2><p>Good friends, no awkward small talk.</p><span className="since-chip"><Heart size={12}/> YOUR INNER CIRCLE</span></div><div className="day-divider"><span>TODAY</span></div>
          {currentMessages.map(m=><div key={m.id} className={`message-row ${m.from==='me'?'mine':''}`}>{m.from==='them'&&<Avatar friend={friend} size="tiny"/>}<div className="message-content">{m.from==='them'&&<span className="message-author">{friend.name.split(' ')[0]}</span>}<div className={`bubble ${m.from==='me'?'bubble-mine':''}`}>{m.text}</div><div className="message-meta"><span>{m.time}</span>{m.from==='me'&&<CheckCheck size={13}/>}</div>{m.reaction&&<button className="reaction-chip" onClick={()=>notify('Reaction added in this local preview.')}>{m.reaction}</button>}</div></div>)}
          <div className="typing-line"><Avatar friend={friend} size="tiny"/><span className="typing-dots"><i/><i/><i/></span><small>{friend.name.split(' ')[0]} might be typing in this preview</small></div>
        </div>
        <div className="composer-wrap"><div className="composer-tools"><button className="icon-button" aria-label="Attach file" onClick={()=>notify('Secure file sharing is not enabled yet.')}><Paperclip size={17}/></button><button className="icon-button" aria-label="Share image" onClick={()=>notify('Secure image sharing is not enabled yet.')}><Image size={17}/></button><span className="composer-hint">A little hello goes a long way.</span><button className="icon-button" aria-label="Help" onClick={()=>notify('Tip: keep it kind, keep it in your circle.')}><CircleHelp size={16}/></button></div><form className="composer" onSubmit={e=>{e.preventDefault();send()}}><input aria-label="Write a message" value={draft} onChange={e=>setDraft(e.target.value)} placeholder={`Message ${friend.name.split(' ')[0]}...`} /><div className="composer-right"><button type="button" className="icon-button emoji-button" aria-label="Add emoji" onClick={()=>setShowEmoji(!showEmoji)}><Smile size={19}/></button><button type="submit" className="send-button" aria-label="Send message" disabled={!draft.trim()}><Send size={17}/></button></div>{showEmoji&&<div className="emoji-popover">{['💜','😂','😭','✨','🫶','❤️','👀','☕'].map(e=><button type="button" key={e} onClick={()=>{setDraft(d=>d+e);setShowEmoji(false)}}>{e}</button>)}</div>}</form><div className="demo-disclaimer">Frontend preview · Messages stay in this browser session only</div></div>
      </section>
      <aside className="details-panel"><div className="details-top"><span>YOUR SPACE</span><button className="icon-button" onClick={()=>notify('More space for your people, coming soon.')} aria-label="More options"><MoreHorizontal size={19}/></button></div><div className="circle-art"><div className="circle-ring"/><div className="circle-center"><Heart size={25} fill="currentColor"/></div><span className="art-star star-a">✦</span><span className="art-star star-b">✧</span></div><h3>Good things live here.</h3><p className="details-sub">A tiny corner of the internet, just for your people.</p><div className="detail-divider"/><div className="details-section-head"><b>Your circle</b><span>{friends.length} friends</span></div><div className="member-list">{friends.map(f=><div key={f.id} className="member-row"><Avatar friend={f} size="tiny"/><span>{f.name}</span><i className={`status-dot ${f.status==='Online now'?'':'offline'}`}/></div>)}</div><button className="invite-button" onClick={()=>{setShowFriends(true);notify('Open the invite section in the sidebar to share your ID.')}}><Plus size={16}/> Invite your people</button><div className="security-note"><span><ShieldCheck size={17}/></span><div><b>Privacy matters</b><p>This UI is a frontend preview. Real authentication, backend messaging, and end-to-end encryption are not yet implemented.</p></div></div><div className="details-footer"><span><Sparkles size={13}/> Made for your inner circle</span><button onClick={()=>notify('Security documentation will be added with the backend milestone.')}>Security notes</button></div></aside>
      <nav className="mobile-nav"><button className="active" onClick={()=>setView('chat')}><MessageCircle size={18}/><span>Chats</span></button><button onClick={()=>setShowFriends(!showFriends)}><Users size={18}/><span>Friends</span></button><button onClick={()=>setShowSettings(!showSettings)}><Settings size={18}/><span>Settings</span></button></nav>
    </main>}
    {notice&&<div className="toast" role="status"><span className="toast-check"><Check size={15}/></span>{notice}<button onClick={()=>setNotice('')} aria-label="Dismiss"><X size={14}/></button></div>}
  </div>
}