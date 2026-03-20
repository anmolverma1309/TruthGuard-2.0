"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function NetworkGraph() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clean up previous renders
        containerRef.current.innerHTML = "";

        const width = containerRef.current.clientWidth;
        const height = 600;

        const data = {
            nodes: [
                { id: "origin", group: 1, radius: 24, label: "randomhealthnews.com" },
                { id: "node1", group: 2, radius: 12, label: "Twitter Bot Net A" },
                { id: "node2", group: 2, radius: 10, label: "Facebook Group: TruthSeekers" },
                { id: "node3", group: 2, radius: 8, label: "User @anon_732" },
                { id: "node4", group: 3, radius: 16, label: "Viral Telegram Channel" },
                { id: "node5", group: 2, radius: 14, label: "Reddit /r/conspiracies" },
                { id: "node6", group: 3, radius: 10, label: "HealthFakeBlog Repost" },
                { id: "node7", group: 2, radius: 12, label: "WhatsApp Forward Chain" },
                { id: "node8", group: 3, radius: 8, label: "User @health_guru" },
            ],
            links: [
                { source: "origin", target: "node1", value: 5 },
                { source: "origin", target: "node2", value: 3 },
                { source: "node1", target: "node3", value: 1 },
                { source: "node1", target: "node4", value: 4 },
                { source: "origin", target: "node5", value: 2 },
                { source: "node5", target: "node6", value: 2 },
                { source: "node4", target: "node6", value: 1 },
                { source: "node1", target: "node7", value: 3 },
                { source: "node7", target: "node8", value: 2 },
            ]
        };

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height]);

        const simulation = d3.forceSimulation(data.nodes as any)
            .force("link", d3.forceLink(data.links).id((d: any) => d.id).distance(120))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, height / 2));

        const link = svg.append("g")
            .attr("stroke", "rgba(0, 229, 255, 0.2)")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(data.links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value) * 1.2);

        const node = svg.append("g")
            .attr("stroke", "#050508")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(data.nodes)
            .join("circle")
            .attr("r", d => d.radius)
            // Group 1: Source (Purple), Group 2: Amplifiers (Cyan), Group 3: Super-spreaders (White)
            .attr("fill", d => d.group === 1 ? "#bf5af2" : d.group === 2 ? "#00e5ff" : "#ffffff");

        // Add glowing filter definition
        const defs = svg.append("defs");
        const filter = defs.append("filter").attr("id", "glow");
        filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "coloredBlur");
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        node.attr("filter", "url(#glow)");

        node.append("title")
            .text(d => d.label);

        const labels = svg.append("g")
            .selectAll("text")
            .data(data.nodes)
            .join("text")
            .text(d => d.label)
            .attr("font-size", 10)
            .attr("fill", "#9ca3af")
            .attr("dx", d => d.radius + 8)
            .attr("dy", 4)
            .attr("class", "font-sans uppercase tracking-widest font-bold pointer-events-none")
            .style("text-shadow", "0 0 10px #050508");

        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);

            labels
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y);
        });

        if (svg.node()) {
            containerRef.current.appendChild(svg.node()!);
        }

        return () => {
            simulation.stop();
        };
    }, []);

    return (
        <div className="w-full">
            <div
                ref={containerRef}
                className="w-full h-[600px] neo-glass rounded-[32px] overflow-hidden border border-white/10 relative"
                style={{ backgroundImage: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.03) 0%, transparent 80%)' }}
            >
                <div className="absolute top-8 left-8 flex flex-col space-y-3 z-10 pointer-events-none">
                    <div className="flex items-center space-x-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-neo-purple shadow-[0_0_8px_rgba(191,90,242,0.5)]" />
                        <span className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-widest font-bold">Signal Origin</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                        <span className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-widest font-bold">Super Node</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-neo-cyan shadow-[0_0_8px_rgba(0,229,255,0.5)]" />
                        <span className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-widest font-bold">Propagator</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
