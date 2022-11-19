import {IServerState, ServerState} from "./server-state.model";
import {ITorrentData, TorrentData} from "./torrent-data.model";

export interface IPreferences {
  torrent_content_layout: string, // Original
  start_paused_enabled: string, // bool
  auto_delete_mode: boolean,
  preallocate_all: boolean,
  incomplete_files_ext: boolean,
  auto_tmm_enabled: string,// boolean
  torrent_changed_tmm_enabled: string, // boolean
  save_path_changed_tmm_enabled: string, // boolean
  category_changed_tmm_enabled: string, // boolean
  save_path: string, // path
  temp_path_enabled: boolean,
  temp_path: string, // path
  export_dir: string,
  export_dir_fin: string,
  scan_dirs: object,
  mail_notification_enabled: boolean,
  mail_notification_sender: string,
  mail_notification_email: string,
  mail_notification_smtp: string,
  mail_notification_ssl_enabled: boolean,
  mail_notification_auth_enabled: boolean,
  mail_notification_username: string,
  mail_notification_password: string,
  autorun_enabled: boolean,
  autorun_program: string,
  listen_port: number,
  upnp: boolean,
  max_connec: number,
  max_connec_per_torrent: number,
  max_uploads: number,
  max_uploads_per_torrent: number,
  proxy_type: number, // maybe bool
  proxy_auth_enabled: boolean,
  proxy_ip: string,
  proxy_port: number,
  proxy_peer_connections: boolean,
  proxy_torrents_only: boolean,
  proxy_username: string,
  proxy_password: string,
  ip_filter_enabled: boolean,
  ip_filter_path: string,
  ip_filter_trackers: boolean,
  banned_IPs: string,
  up_limit: number,
  dl_limit: number,
  alt_up_limit: number,
  alt_dl_limit: number,
  bittorrent_protocol: string, // maybe number
  limit_utp_rate: boolean,
  limit_tcp_overhead: boolean,
  limit_lan_peers: boolean,
  scheduler_enabled: boolean,
  dht: boolean,
  pex: boolean,
  lsd: boolean,
  encryption: string, // number
  anonymous_mode: boolean,
  queueing_enabled: boolean,
  max_ratio_enabled: boolean,
  max_ratio: number,
  max_seeding_time_enabled: boolean,
  max_seeding_time: number,
  max_ratio_act: number,
  add_trackers_enabled: boolean,
  add_trackers: string,
  rss_processing_enabled: boolean,
  rss_refresh_interval: string, // number
  rss_max_articles_per_feed: string, // number
  rss_auto_downloading_enabled: boolean,
  rss_download_repack_proper_episodes: boolean,
  rss_smart_episode_filters: string, //regex
  locale: string, // locale
  web_ui_domain_list: string,
  web_ui_address: string,
  web_ui_port: number,
  web_ui_upnp: boolean,
  use_https: boolean,
  web_ui_https_cert_path: string,
  web_ui_https_key_path: string,
  web_ui_username: string,
  bypass_local_auth: boolean,
  bypass_auth_subnet_whitelist_enabled: boolean,
  bypass_auth_subnet_whitelist: string,
  web_ui_max_auth_fail_count: string, // number
  web_ui_ban_duration: string, //number
  web_ui_session_timeout: string, // number
  alternative_webui_enabled: boolean,
  alternative_webui_path: string, // path
  web_ui_clickjacking_protection_enabled: boolean,
  web_ui_csrf_protection_enabled: boolean,
  web_ui_secure_cookie_enabled: boolean,
  web_ui_host_header_validation_enabled: boolean,
  web_ui_use_custom_http_headers_enabled: boolean,
  web_ui_custom_http_headers: string,
  web_ui_reverse_proxy_enabled: boolean,
  web_ui_reverse_proxies_list: string,
  dyndns_enabled: boolean,
  dyndns_service: string, // number
  dyndns_domain: string,
  dyndns_username: string,
  dyndns_password: string,
  current_network_interface: string,
  current_interface_address: string,
  save_resume_data_interval: string, // number
  recheck_completed_torrents: boolean,
  resolve_peer_countries: boolean,
  reannounce_when_address_changed: boolean,
  async_io_threads: string, // number
  hashing_threads: string, // number
  file_pool_size: string, // number
  checking_memory_use: string, // number
  disk_cache: string, // number
  disk_cache_ttl: string, //number
  enable_os_cache: boolean,
  enable_coalesce_read_write: boolean,
  enable_piece_extent_affinity: boolean,
  enable_upload_suggestions: boolean,
  send_buffer_watermark: string, // number
  send_buffer_low_watermark: string, // munumber
  send_buffer_watermark_factor: string,
  connection_speed: string, // munumber
  socket_backlog_size: string, // munumber
  outgoing_ports_min: string, // munumber
  outgoing_ports_max: string, // munumber
  upnp_lease_duration: string, // munumber
  peer_tos: string, // munumber
  utp_tcp_mixed_mode: string, // munumber
  idn_support_enabled: boolean,
  enable_multi_connections_from_same_ip: boolean,
  validate_https_tracker_certificate: boolean,
  ssrf_mitigation: boolean,
  block_peers_on_privileged_ports: boolean,
  enable_embedded_tracker: boolean,
  embedded_tracker_port: string, // munumber
  upload_slots_behavior: string, // munumber
  upload_choking_algorithm: string, // munumber
  announce_to_all_trackers: boolean,
  announce_to_all_tiers: boolean,
  announce_ip: string,
  max_concurrent_http_announces: string, // munumber,
  stop_tracker_timeout: string, // munumber
  peer_turnover: string, // munumber
  peer_turnover_cutoff: string, // munumber
  peer_turnover_interval: string, // munumber

}

export interface IServerStats {
  categories: object;//?
  full_update: boolean;
  rid: number;
  server_state: IServerState;
  tags: string[]
  torrents: Record<string, ITorrentData>;
  trackers: object;
}

export class ServerStats {

  private readonly _categories: object;
  private readonly _fullUpdate: boolean;
  private readonly _rid: number;
  private readonly _serverState: ServerState;
  private readonly _tags: string[];
  private readonly _torrents: Map<string, TorrentData>;


  constructor(json: IServerStats) {
    this._categories = json.categories;
    this._fullUpdate = json.full_update;
    this._rid = json.rid;
    this._serverState = this.parseServerState(json.server_state);
    this._tags = json.tags;
    this._torrents = this.parseTorrentsObject(json.torrents);
  }


  get torrents(): Map<string, TorrentData> {
    return this._torrents;
  }

  get categories(): object {
    return this._categories;
  }

  get fullUpdate(): boolean {
    return this._fullUpdate;
  }

  get rid(): number {
    return this._rid;
  }

  get serverState(): ServerState {
    return this._serverState;
  }

  get tags(): string[] {
    return this._tags;
  }

  get categoriess(): object {
    return this._categories;
  }

  private parseTorrentsObject(torrents: object): Map<string, TorrentData> {
    // console.log(torrents);
    const m = new Map<string, TorrentData>();
    for (const k in torrents) {
      // @ts-ignore
      m.set(k, new TorrentData(k, torrents[k], null));
      console.log("new torrent created " + k);
    }
    return m;
  }

  private parseServerState(state: IServerState): ServerState {
    return new ServerState(state);
  }
}
